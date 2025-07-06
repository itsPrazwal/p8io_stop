export const Footer = () => (
  <footer className="bg-gray-800 text-white py-4">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Prazwal Malakar. All rights reserved.
      </p>
      <p className="text-xs mt-2">
        Tech Stack: NextJS + Express.JS / NestJS + PostgreSQL + REST API
      </p>
    </div>
  </footer>
)