This is the our official submission for HackBeanPot 2025

![COVER](https://github.com/user-attachments/assets/09b6bcca-b7a2-4996-9bc0-dffe94dea7c5)

## Overview
Roadar is a application that aims to crowdsource roadside assistance. We enable this by connecting drivers who need assistance with their vehicles and mechanics willing to offer support. Drivers can create requests which are sent out to mechanics based on location in realtime using web-sockets and mechanics and accept or deny jobs on their own accord

## Features 
1. Apple OAuth 
2. Request Creation
3. Live request popups 
4. S3 Integration
5. Web Socket integration 
6. Profile pages 
7. Activity history 

## References

![image](https://github.com/user-attachments/assets/786e36b4-9642-40c5-96ba-ffeac90b4fa8)
![User Flows](https://github.com/user-attachments/assets/3601486e-12b7-44e7-9a90-0f2b9d86c76b)
![image](https://github.com/user-attachments/assets/0f5e4969-2e49-4f2b-9dca-70714610124b)
![image](https://github.com/user-attachments/assets/d7f21368-8a85-4638-a44c-b4d8bb8f387e)

# Tech Stack

- **Backend:** Go, Fiber, Websockets
- **Frontend**: React Native, TypeScript, Expo SDK 52
- **Database**: MongoDB Atlas

# Environment Setup

```text
Roadar DEVELOPMENT ENVIRONMENT
╭──────────────────┬─────────────────────────────────────────────────╮
│ scripts          │ description                                     │
├──────────────────┼─────────────────────────────────────────────────┤
│ backend-lint     │ # Lints backend code.                           │
│ backend-run      │ # Runs the backend server in development mode.  │
│ backend-test     │ # Tests backend code.                           │
│ database-script  │ # Runs a script against the connected Database  │
│ frontend-lint    │ # Lints frontend code.                          │
│ frontend-run     │ # Runs the frontend server in development mode. │
│ frontend-run-wsl │ # Runs the frontend server in tunnel mode.      │
│ frontend-test    │ # Runs the frontend tests.                      │
╰──────────────────┴─────────────────────────────────────────────────╯

```

This guide assumes that you are using Linux/macOS. **If you are using Windows, please install [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)**.

To get started, clone the repository via HTTPS by running `git clone https://github.com/abhikaboy/Roadar.git`.
If you'd prefer, you can [clone it via SSH](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### NIX Installation (Recommended)

1. [Install Nix](https://zero-to-nix.com/start/install)
   <!-- markdownlint-disable MD013 -->
   ```sh
   curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install
   ```
   <!-- markdownlint-enable MD013 -->

- Type in computer password if prompted.
- Say yes to prompt.

2. In a new terminal activate the development environment by running the following:

<!-- markdownlint-disable MD013 -->

```sh
nix develop --impure
```

<!-- markdownlint-enable MD013 -->
