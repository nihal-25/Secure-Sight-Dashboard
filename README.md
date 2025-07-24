# SecureSight Dashboard

A modern incident review dashboard with interactive video timeline, camera insights, and incident management.

---

## 🛠️ Deployment Instructions

### Local Development

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/secure-sight-dashboard.git
   cd secure-sight-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DATABASE_URL=your_postgresql_database_url
   ```

4. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

> App should be running at `http://localhost:3000`.

---

### Deploying to Vercel

1. **Push your code to GitHub.**
2. **Import your project on [vercel.com](https://vercel.com).**
3. When prompted for the root directory, choose:
   ```
   /
   ```
4. Add your environment variables under **Project Settings → Environment Variables**:
   ```env
   DATABASE_URL=your_postgresql_database_url
   ```
5. Update your `package.json` to ensure Prisma generates before build:
   ```json
   "scripts": {
     "postinstall": "prisma generate",
     "build": "prisma generate && next build"
   }
   ```
6. **Deploy!**

---

## ⚙️ Tech Decisions

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router for modern routing and API routes.
- **Database:** Prisma + Neon DB, Prisma for type-safe DB access; Neon for scalable serverless Postgres.
- **Hosting:** [Vercel](https://vercel.com/) for frontend & serverless backend.
- **Styling:** CSS for fast and responsive UI development.
- **Video Handling:** Native HTML5 `<video>` element paired with an interactive SVG/Canvas-based incident timeline.
- **Type Safety:** TypeScript for compile-time safety.
- **API Design:** RESTful endpoints (e.g. `PATCH /api/incidents/:id/resolve`).

---

## 🧠 If I Had More Time...

Learn how to implement 3D website in React Three Fibre.

Add authentication for user login/logout.

Add search/filter for incidents.

Sync video thumbnails more precisely on seek.

Improve timeline animation and drag performance.

Add admin panel to manage incidents dynamically.

Add audio waveform for threat detection clues.

