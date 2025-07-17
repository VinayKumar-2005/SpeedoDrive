# 🚗 SpeedoDrive – Smart. Swift. Secure Rides

SpeedoDrive is a modern, mobile-responsive **car rental platform** offering a seamless and secure experience for booking vehicles. From sleek UI to dynamic car listings, login/signup, and real-time backend APIs, it's everything you need to launch a scalable rental app.

## 🧪 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/speedodrive.git
cd speedodrive
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

📝 Create `.env.local` file inside `backend/`:

```env
PORT=3000
MONGO_URI=xxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=yourSuperSecretKey
```

Start MongoDB manually (if you're using local MongoDB):

```bash
mongod
```

Then run backend:

```bash
npm start
```

---

### 3. Setup Frontend

Open `frontend/index.html` using **Live Server** (VS Code Extension):

```bash
Right click → Open with Live Server
```

Or use a lightweight HTTP server:

```bash
cd frontend
npx serve
```

Ensure it's running on a different port (e.g., `5500`), since backend is on `3000`.



## ✅ Future Improvements

- Admin dashboard
- Payment gateway integration
- Booking history
- User profile management
- Reviews & ratings system
- Deploy frontend (Vercel/Netlify) + backend (Render/Railway)


