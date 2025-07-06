export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">P8IO-STOP (Skill Task Offer Progress)</h1>
      <nav className="mt-2 ">
        <ul className="flex space-x-4">
          <li>
            <a href="/auth/login">Login</a>
          </li>
          <li>
            <a href="/auth/signup">Sign Up</a>
          </li>
          <li>
            <a href="/auth/forgot-password">Forgot Password</a>
          </li>
          <li>
            <a href="/auth/reset-password">Reset Password</a>
          </li>
          <li>
            <a href="/dashboard/offers">Offers</a>
          </li>
          <li>
            <a href="/dashboard/skills">Skills</a>
          </li>
          <li>
            <a href="/dashboard/profile">Profiles</a>
          </li>
          <li>
            <a href="/dashboard/tasks">Tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}