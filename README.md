# CasaEsfera

CasaEsfera is a personal software project designed to integrate various services that enhance daily life, such as access to home surveillance cameras, data hosting (pictures, audio), task tracking, reminders, Pomodoro assistance, and more. The project aims to be a comprehensive solution for home management, accessible by multiple family members and hosted locally.

## Features

- Home Surveillance Camera Integration
- Data Hosting (Pictures, Audio)
- Task Tracker
- Reminders
- Pomodoro Assistance
- User Authentication and Access Control

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Styling**: Material-UI
- **Package Manager**: pnpm
- **Languages**: TypeScript

## Getting Started

### Prerequisites

- Node.js
- pnpm
- MongoDB

### Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/pxzin/casa-esfera.git
   cd casa-esfera
   ```

2. **Install dependencies**:

   ```sh
   pnpm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory
   - Add the following environment variables:
     ```env
     MONGODB_URI=your_mongodb_uri
     NEXTAUTH_URL=http://localhost:3000
     ```
4. **Run the development server**:
   ```sh
   pnpm dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser**.

### Next Steps Checklist:

- Authentication and Authorization
- Home Surveillance Camera Integration
- Data Hosting (Pictures, Audio)
- Task Tracker
- Reminders
- Pomodoro Assistance
- UI/UX Improvements
- Testing
- Deployment

## Contributing

Is too early to accept contributions, but feel free to open an issue or contact me if you have any questions or suggestions.

## License

Distributed under the MIT License. See `LICENSE` for more information.
