import { Link } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_25%),linear-gradient(135deg,#020b1d_0%,#0d1b3d_25%,#1d4ed8_60%,#312e81_100%)] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/55 p-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
                <h2 className="mb-7 text-center text-3xl font-bold tracking-tight text-white">Đăng ký</h2>
                <SignUpForm />
                <p className="mt-6 text-center text-sm text-slate-300">
                    Đã có tài khoản?{" "}
                    <Link to="/signin" className="font-semibold text-blue-300 transition hover:text-blue-200 hover:underline">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
