# Study Planner · Firebase + GitHub Pages

This is the Firebase/GitHub Pages edition of the original **Study Planner · 174 Videos**. The planner UI, timetable, subjects, videos, tabs, progress, catch-up tools, JSON import/export, theme handling, animations and mobile layout are preserved.

## Why `firebase-config.js` is not included

The Firebase Web configuration is normally used by browser code. However, GitHub Secret Scanning can flag the Firebase API key when it is committed to a repository. This project therefore creates `firebase-config.js` during the GitHub Pages deployment from GitHub Actions Secrets.

**Do not upload your old `firebase-config.js` to GitHub.**

## 1. Firebase setup

Confirm:
- Authentication → Sign-in method → Email/Password is enabled.
- Firestore Database exists.
- The Firebase Auth user `safree@studyplanner.app` exists.
- The password is known only to you and is entered at login. It is not stored in this repository.

Publish the supplied `firestore.rules` in Firebase Console → Firestore Database → Rules.

## 2. GitHub repository

Create a fresh repository for this cleaned project. If your old repository contains only this Study Planner project and no other work, the safest option is to delete that repository and create a new empty one. This removes the old API-key-containing commit history.

Upload all files/folders from this project, including `.github/workflows/pages.yml` and `firebase-config.template.js`.

Do NOT upload `firebase-config.js`.

## 3. Add GitHub Actions Secrets

Repository → Settings → Secrets and variables → Actions → New repository secret.

Create these seven secrets:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`

Use the values from your Firebase Web App configuration.

Do not put the Firebase Auth password into any of these secrets.

## 4. GitHub Pages

The included workflow deploys the site automatically whenever you push to `main`.

GitHub → Settings → Pages → Source should be **GitHub Actions**.

After the workflow succeeds, open the Pages URL shown by GitHub.

## Login

User ID: `safree`

The app internally maps this to `safree@studyplanner.app`. The password is entered by the user and handled by Firebase Authentication.

## Firestore data

Planner state:
`users/{uid}/planner/state`

Profile helper:
`users/{uid}/profile/main`

The rules restrict these user documents to the authenticated owner.
