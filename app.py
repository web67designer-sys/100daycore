from flask import Flask, render_template, redirect, url_for, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import razorpay, random
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"

RAZORPAY_KEY = "YOUR_RAZORPAY_KEY"
RAZORPAY_SECRET = "YOUR_RAZORPAY_SECRET"
razor_client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))

# ================= MODELS =================

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    age = db.Column(db.Integer)
    goal = db.Column(db.String(100))
    gender = db.Column(db.String(20))

    xp = db.Column(db.Integer, default=0)
    coins = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak = db.Column(db.Integer, default=0)
    days_completed = db.Column(db.Integer, default=0)

    premium_type = db.Column(db.String(20), default="none")
    premium_expiry = db.Column(db.DateTime)
    total_spent = db.Column(db.Integer, default=0)

class DailyTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    day_number = db.Column(db.Integer)
    task_text = db.Column(db.String(200))
    completed = db.Column(db.Boolean, default=False)

class StoreItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    price = db.Column(db.Integer)
    required_level = db.Column(db.Integer)
    premium_only = db.Column(db.Boolean)

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    item_name = db.Column(db.String(100))
    item_type = db.Column(db.String(50))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ================= UTILS =================

def calculate_level(user):
    user.level = user.xp // 100 + 1

def check_premium(user):
    if user.premium_expiry and datetime.utcnow() > user.premium_expiry:
        user.premium_type = "none"
        user.premium_expiry = None
        db.session.commit()

def generate_tasks(user):
    pool = [
        "Pushups 3x15", "Drink 3L Water", "Stretch 15 mins",
        "Read 20 pages", "Mock Test", "Squats 4x12",
        "Jog 20 mins", "Meditate 10 mins",
        "Deadlift 4 sets", "Core workout 15 mins"
    ]
    tasks = random.sample(pool, 5)
    for t in tasks:
        db.session.add(DailyTask(
            user_id=user.id,
            day_number=user.days_completed+1,
            task_text=t
        ))
    db.session.commit()

def ai_coach_reply(q):
    if current_user.premium_type == "elite":
        return f"💎 Elite Plan for {current_user.goal}: Advanced roadmap + tracking."
    elif current_user.premium_type == "monthly":
        return "🥈 Premium structured guidance."
    return "🔥 Stay consistent. Discipline wins."

# ================= AUTH =================

@app.route("/")
def home():
    return redirect(url_for("login"))

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method == "POST":
        user = User(
            name=request.form["name"],
            email=request.form["email"],
            age=request.form["age"],
            goal=request.form["goal"],
            gender=request.form["gender"]
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        generate_tasks(user)
        return redirect(url_for("dashboard"))
    return render_template("register.html")

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        user = User.query.filter_by(email=request.form["email"]).first()
        if user:
            login_user(user)
            return redirect(url_for("dashboard"))
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("login"))

# ================= DASHBOARD =================

@app.route("/dashboard")
@login_required
def dashboard():
    check_premium(current_user)
    tasks = DailyTask.query.filter_by(
        user_id=current_user.id,
        day_number=current_user.days_completed+1
    ).all()
    return render_template("dashboard.html", tasks=tasks)

@app.route("/complete_task/<int:id>")
@login_required
def complete_task(id):
    task = DailyTask.query.get(id)
    if task and not task.completed:
        task.completed=True
        current_user.xp+=10
        current_user.coins+=5
        calculate_level(current_user)
        db.session.commit()
    return redirect(url_for("dashboard"))

@app.route("/complete_day")
@login_required
def complete_day():
    current_user.days_completed+=1
    current_user.streak+=1
    current_user.xp+=50
    current_user.coins+=20
    calculate_level(current_user)
    generate_tasks(current_user)
    db.session.commit()
    return redirect(url_for("dashboard"))

# ================= AI =================

@app.route("/ai", methods=["POST"])
@login_required
def ai():
    return jsonify({"answer": ai_coach_reply(request.json["q"])})

# ================= PREMIUM =================

@app.route("/create_order/<plan>")
@login_required
def create_order(plan):
    amount = 9900 if plan=="monthly" else 29000
    order = razor_client.order.create({"amount":amount,"currency":"INR","payment_capture":1})
    return jsonify(order)

@app.route("/payment_success/<plan>")
@login_required
def payment_success(plan):
    if plan=="monthly":
        current_user.premium_type="monthly"
        current_user.premium_expiry=datetime.utcnow()+timedelta(days=30)
        current_user.total_spent+=99
    else:
        current_user.premium_type="elite"
        current_user.premium_expiry=datetime.utcnow()+timedelta(days=365)
        current_user.total_spent+=290
    db.session.commit()
    return redirect(url_for("dashboard"))

# ================= RUN =================

if __name__=="__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
