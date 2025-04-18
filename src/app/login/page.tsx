import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Doctor Appointment System</h1>
      <LoginForm />
    </div>
  );
}