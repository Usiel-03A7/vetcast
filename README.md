# 🐾 VetCast - Veterinary Clinic Management System  

![VetCast Logo](public/images/logo.png)  
*A modern web app for veterinary clinics with appointment scheduling, pet records, and an editable landing page.*  

## 🚀 Live Demo  
[View Demo](https://vetcast.web.app) (*available after deployment*)  

## ✨ Key Features  
- **Veterinarian Dashboard**:  
  - 📅 Interactive calendar for appointments  
  - 🐶 Pet/owner CRUD with medical history  
  - 🔍 Search pets by name, owner, or date  
- **Editable Landing Page**:  
  - ✏️ Built-in CMS to update public content  
- **Secure Authentication**:  
  - 🔒 Role-based login (Firebase Auth)  

## 🛠 Tech Stack  
| **Frontend**       | **Backend**       | **Tools**            |  
|--------------------|-------------------|----------------------|  
| React 18           | Firebase Firestore| Tailwind CSS         |  
| React Router 6     | Firebase Storage  | FullCalendar (React) |  
| Context API        | Firebase Auth     | React Hook Form      |  
| Tailwind CSS       | Firebase Hosting  | Vite (optional)      |  

## 📂 Project Structure  
```bash
src/
├── components/    # Reusable UI (Navbar, PetCard)  
├── pages/         # Main views (Login, Dashboard, Home)  
├── services/      # Firebase API calls (auth, db)  
├── context/       # Global state (AuthContext)  
└── assets/        # Styles & static images  
