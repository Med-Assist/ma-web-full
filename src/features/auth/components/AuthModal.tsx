"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Lock, Mail, Shield, Stethoscope, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "@/styles/landing.scss";
import { auth } from "../../../shared/lib/firebase";
import { createUser } from "../../../shared/lib/generated-fdc";
import { getMedAssistDataConnect } from "../../../shared/lib/dataconnect";
import { rememberActiveDoctorUid } from "../../../shared/lib/medassist-runtime";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
};

type FirebaseError = {
  code?: string;
  message?: string;
};

export const AuthModal = ({ isOpen, onClose, initialMode = "login" }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [role, setRole] = useState("doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const isLogin = mode === "login";
  const themeColor = isLogin ? "blue" : "cyan";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("M\u1eadt kh\u1ea9u x\u00e1c nh\u1eadn kh\u00f4ng kh\u1edbp!");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        rememberActiveDoctorUid(userCredential.user.uid);
        alert("\u0110\u0103ng nh\u1eadp th\u00e0nh c\u00f4ng! Ch\u00e0o m\u1eebng tr\u1edf l\u1ea1i MedAssist.");
        onClose();
        router.push("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        rememberActiveDoctorUid(user.uid);
        const emailPrefix = user.email?.split("@")[0] || role;
        const displayName = role === "doctor" ? `BS. ${emailPrefix}` : `Qu\u1ea3n tr\u1ecb ${emailPrefix}`;

        await createUser(getMedAssistDataConnect(), {
          uid: user.uid,
          email: user.email!,
          role,
          displayName,
          status: "active",
          authProvider: "password",
          passwordSet: true,
        });

        alert("T\u1ea1o t\u00e0i kho\u1ea3n th\u00e0nh c\u00f4ng! D\u1eef li\u1ec7u \u0111\u00e3 \u0111\u01b0\u1ee3c l\u01b0u tr\u1eef an to\u00e0n.");
        onClose();
      }
    } catch (err: unknown) {
      const error = err as FirebaseError;

      console.error("L\u1ed7i x\u00e1c th\u1ef1c:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email n\u00e0y \u0111\u00e3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng. Vui l\u00f2ng th\u1eed \u0111\u0103ng nh\u1eadp.");
      } else if (error.code === "auth/weak-password") {
        alert("M\u1eadt kh\u1ea9u qu\u00e1 y\u1ebfu. Vui l\u00f2ng nh\u1eadp \u00edt nh\u1ea5t 6 k\u00fd t\u1ef1.");
      } else {
        alert(`C\u00f3 l\u1ed7i x\u1ea3y ra: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative flex h-[90vh] max-h-[700px] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0B1121] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 rounded-full bg-[#0B1121] p-1 text-slate-500 transition-colors hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="auth-left-branding hidden flex-col overflow-hidden lg:flex">
          <div className="illustration-overlay absolute inset-0 z-0" />
          <div className="glow-bg absolute inset-0 z-0" />

          <div className="relative z-20 mb-6 flex items-center gap-3">
            <img src="/logo.png" alt="MedAssist Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-white uppercase">MedAssist</span>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <img
              src="/phone.png"
              alt="Illustration"
              className="h-full w-full scale-110 object-cover opacity-60 mix-blend-lighten drop-shadow-[0_20px_40px_rgba(34,211,238,0.2)]"
            />
          </div>

          <div className="relative z-20 mt-auto">
            <h2 className="mb-3 text-3xl leading-tight font-bold text-white">
              {"C\u1ed5ng Th\u00f4ng tin B\u1ec7nh nh\u00e2n"} <br />&{" "}
              <span className="text-cyan-400">{"Ch\u1ea9n \u0111o\u00e1n N\u00e2ng cao"}</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              {"Truy c\u1eadp d\u1eef li\u1ec7u l\u00e2m s\u00e0ng th\u1eddi gian th\u1ef1c v\u00e0 h\u1ed3 s\u01a1 y t\u1ebf b\u1ea3o m\u1eadt"}
            </p>
          </div>
        </div>

        <div className="flex h-full w-full flex-col bg-[#0B1121] p-8 sm:p-12 lg:w-1/2">
          <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
              <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h1 className="mt-2 mb-2 text-3xl font-bold text-white">
                  {isLogin ? "Ch\u00e0o m\u1eebng tr\u1edf l\u1ea1i" : "T\u1ea1o t\u00e0i kho\u1ea3n m\u1edbi"}
                </h1>
                <p className="mb-8 text-sm text-slate-400">
                  {isLogin
                    ? "Vui l\u00f2ng nh\u1eadp th\u00f4ng tin c\u1ee7a b\u1ea1n \u0111\u1ec3 truy c\u1eadp b\u1ea3ng \u0111i\u1ec1u khi\u1ec3n b\u1ea3o m\u1eadt."
                    : "B\u1eaft \u0111\u1ea7u b\u1eb1ng c\u00e1ch ch\u1ecdn vai tr\u00f2 ph\u00f9 h\u1ee3p v\u1edbi b\u1ea1n trong h\u1ec7 th\u1ed1ng."}
                </p>

                {!isLogin ? (
                  <label className="mb-4 block text-xs font-bold tracking-widest text-cyan-500 uppercase">
                    {"B\u01af\u1edaC 1: CH\u1eccN VAI TR\u00d2 C\u1ee6A B\u1ea0N"}
                  </label>
                ) : null}

                <div className="mb-8 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`role-option ${role === "admin" ? (isLogin ? "active-blue" : "active-cyan") : ""}`}
                  >
                    <Shield
                      className={`mb-2 h-5 w-5 ${role === "admin" ? (isLogin ? "text-blue-400" : "text-cyan-400") : "text-slate-500"}`}
                    />
                    <span className="text-sm font-semibold text-white">{"Qu\u1ea3n tr\u1ecb vi\u00ean"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("doctor")}
                    className={`role-option ${role === "doctor" ? (isLogin ? "active-blue" : "active-cyan") : ""}`}
                  >
                    <Stethoscope
                      className={`mb-2 h-5 w-5 ${role === "doctor" ? (isLogin ? "text-blue-400" : "text-cyan-400") : "text-slate-500"}`}
                    />
                    <span className="text-sm font-semibold text-white">{"B\u00e1c s\u0129"}</span>
                  </button>
                </div>

                {!isLogin ? (
                  <label className="mb-4 block text-xs font-bold tracking-widest text-cyan-500 uppercase">
                    {"B\u01af\u1edaC 2: TH\u00d4NG TIN \u0110\u0102NG K\u00dd"}
                  </label>
                ) : null}

                <form className="space-y-5" onSubmit={handleSubmit} suppressHydrationWarning>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">{"Email c\u00f4ng vi\u1ec7c"}</label>
                    <div className="auth-input-group">
                      <Mail className="absolute top-3.5 left-3 h-5 w-5 text-slate-500" />
                      <input
                        className={`focus-${themeColor}`}
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={isLogin ? "ten@to-chuc-y-te.org" : "example@healthcare.com"}
                      />
                    </div>
                  </div>

                  <div className={isLogin ? "" : "grid grid-cols-2 gap-4"}>
                    <div className="flex-1">
                      <div className="mb-2 flex justify-between">
                        <label className="text-sm font-medium text-slate-300">{"M\u1eadt kh\u1ea9u"}</label>
                        {isLogin ? (
                          <button type="button" className="text-xs text-blue-400 hover:underline">
                            {"Qu\u00ean m\u1eadt kh\u1ea9u?"}
                          </button>
                        ) : null}
                      </div>
                      <div className="auth-input-group">
                        <Lock className="absolute top-3.5 left-3 h-5 w-5 text-slate-500" />
                        <input
                          className={`focus-${themeColor}`}
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((current) => !current)}
                          className="absolute top-3.5 right-3 text-slate-500"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {!isLogin ? (
                      <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium text-slate-300">{"X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u"}</label>
                        <div className="auth-input-group">
                          <CheckCircle2 className="absolute top-3.5 left-3 h-5 w-5 text-slate-500" />
                          <input
                            className="focus-cyan"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {isLogin ? (
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <input type="checkbox" className="rounded border-white/10 bg-[#151C2C] text-blue-500" />
                      <span>{"Ghi nh\u1edb thi\u1ebft b\u1ecb n\u00e0y trong 30 ng\u00e0y"}</span>
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 w-full rounded-xl py-4 text-sm font-bold transition-all shadow-lg ${
                      isLogin ? "btn-glow-primary" : "bg-cyan-400 text-[#0B1121] shadow-cyan-500/20 hover:bg-cyan-300"
                    } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {isLoading ? "\u0110ANG X\u1eec L\u00dd..." : isLogin ? "\u0110\u0103ng nh\u1eadp v\u00e0o H\u1ec7 th\u1ed1ng" : "\u0110\u0102NG K\u00dd T\u00c0I KHO\u1ea2N"}
                  </button>
                </form>

                <div className="relative my-8 flex items-center justify-center">
                  <div className="absolute w-full border-t border-white/5" />
                  <span className="relative bg-[#0B1121] px-4 text-[10px] tracking-widest text-slate-500 uppercase">
                    {"Ho\u1eb7c"} {isLogin ? "ti\u1ebfp t\u1ee5c" : "\u0111\u0103ng k\u00fd"} {"v\u1edbi"}
                  </span>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#151C2C] py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/5"
                >
                  <img src="/google.png" className="h-5 w-5" alt="Google" />
                  {isLogin ? "T\u00e0i kho\u1ea3n Google" : "Ti\u1ebfp t\u1ee5c v\u1edbi Google"}
                </button>

                <p className="mt-8 pb-4 text-center text-sm text-slate-400">
                  {isLogin ? "M\u1edbi gia nh\u1eadp m\u1ea1ng l\u01b0\u1edbi y t\u1ebf?" : "\u0110\u00e3 c\u00f3 t\u00e0i kho\u1ea3n?"}
                  <button
                    onClick={() => setMode(isLogin ? "signup" : "login")}
                    className={`ml-2 font-bold hover:underline ${isLogin ? "text-blue-400" : "text-cyan-400"}`}
                  >
                    {isLogin ? "\u0110\u0103ng k\u00fd" : "\u0110\u0103ng nh\u1eadp"}
                  </button>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
