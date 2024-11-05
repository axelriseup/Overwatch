# Overwatch Installation Guide

### Table of Contents
1. [Introduction](#introduction)
2. [Deploying with Netlify (For Non-Technical Users)](#deploying-with-netlify-for-non-technical-users)
3. [Configuration](#configuration)
4. [Contributing](#contributing)

---

### Introduction
The Overwatch Extension is a Single-Page Application (SPA) for LNbits, designed to work directly in any browser. Deploying on Netlify is an easy, user-friendly option that requires no server management and minimal setup.

---

### Deploying with Netlify (For Non-Technical Users)

1. **Sign Up for Netlify**:  
   Create a [Netlify account](https://www.netlify.com/) if you haven’t already.

2. **Fork or Download the Repository**:  
   If you have a GitHub account, fork the Overwatch repository to your account, or simply download the repository as a ZIP file and extract it to a folder.

3. **Create a New Site in Netlify**:
   - In the Netlify dashboard, click **"Add new site"** and select **"Import an existing project"**.
   - Connect to your GitHub repository where Overwatch is stored (or upload the folder if working locally).

4. **Set Build Settings**:  
   - **Build Command**: `quasar build`
   - **Publish Directory**: `dist/spa`

5. **Deploy**:  
   Click **"Deploy Site"**. Netlify will handle the build and provide a link to your live site once complete.

6. **Configure the URL**:
   Once deployed, you may need to update the URL in the app's configuration to match your LNbits instance if not using the default. Modify the `config.js` or similar file, and push the changes if using GitHub, or re-upload the project to Netlify if working locally.

---

### Configuration
To enable Overwatch to connect to your specific LNbits instance, ensure the URL configuration points to your server.

---

### Contributing
If you love Free and Open Source Software (FOSS), contribute back by submitting improvements as Pull Requests to this project!

---

Let us know if you have any concerns or questions!
