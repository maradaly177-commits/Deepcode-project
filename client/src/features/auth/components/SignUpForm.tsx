import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
    name: z.string().min(2, "Tên ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export function SignUpForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            console.log("SignUp data:", data);
            navigate("/signin");
        } catch (err) {
            alert("Đăng ký thất bại, vui lòng thử lại!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Tên</label>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="Nhập tên"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Nhập email"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Mật khẩu</label>
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-3 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:from-blue-400 hover:to-indigo-400"
            >
                Đăng ký
            </button>
        </form>
    );
}
