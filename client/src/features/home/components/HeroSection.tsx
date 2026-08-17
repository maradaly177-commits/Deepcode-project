import { Link } from "react-router-dom";

export function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_25%),linear-gradient(135deg,#020b1d_0%,#0d1b3d_26%,#1d4ed8_58%,#312e81_100%)] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(96,165,250,0.22),transparent_30%)]" />

            <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
                <div className="text-3xl font-black tracking-tight text-white">DeepCode</div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/signin"
                        className="rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/signup"
                        className="rounded-xl border border-white/40 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl items-center justify-center px-6 pb-20 pt-8 text-center">
                <div>
                    <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-[6rem] lg:leading-[1.02]">
                        Welcome to DeepCode
                    </h1>

                    <p className="mx-auto mt-8 max-w-3xl text-base text-blue-100 sm:text-xl">
                        Build modern web applications with React, TypeScript, Tailwind CSS and
                        Spring Boot.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Link
                            to="/signin"
                            className="rounded-xl bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-orange-600/30 transition hover:bg-orange-400"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-xl border border-white/60 bg-transparent px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                        >
                            Create Account
                        </Link>
                    </div>

                    <p className="mt-8 text-base text-blue-100">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold underline-offset-4 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
