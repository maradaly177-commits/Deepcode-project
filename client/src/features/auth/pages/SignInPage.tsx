import { SignInForm } from "../components/SignInForm";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Đăng nhập</h2>
                <SignInForm />
                <p className="mt-4 text-center text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <a href="/signup" className="text-orange-500 hover:underline">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    );
}
