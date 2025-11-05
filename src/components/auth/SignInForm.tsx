import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { Auth } from "../../utils/rest";
import { setCookie } from "cookies-next";
import { Config } from "../../config";
import { Cryp } from "../../utils/secure";

interface SignInFormProps {
  handleSubmitSuccess: (profile: any) => void;
}

export default function SignInForm({ handleSubmitSuccess }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const handleSignIn = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Get form values
  //   console.log("Username:", username);
  //   console.log("Password:", password);
  //   console.log("Remember Me:", isChecked);
  //   // Here you can add your API call or authentication logic
  //   // For now, just navigate to dashboard
  //   // navigate("/dashboard");
  // };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Mock profile with proper menu structure (string icons, not JSX)
    const mockProfile = {
      id: 8,
      code: null,
      email: 'super2@user.com',
      mobile: null,
      prefix_id: null,
      prefix_name: null,
      first_name: 'super2',
      last_name: 'user',
      full_name: 'super2 user',
      photo: '',
      role_level: 'super',
      role_id: 1,
      role_name: 'SuperAdmin',
      org_id: '1',
      org_name: null,
      org_status: null,
      status: 1,
      last_login: "2025-11-02T06:55:20.545Z",
      menus: [
        {
          id: 1,
          icon: "grid",
          name: "ภาพรวมระบบ",
          url: "/dashboard",
          priority: 1,
          children: []
        },
        {
          id: 2,
          icon: "page",
          name: "ข้อมูลบ่อ",
          url: "/dashboard/pages1",
          priority: 2,
          children: []
        },
        {
          id: 3,
          icon: "page",
          name: "การให้อาหาร",
          url: "/dashboard/pages2",
          priority: 3,
          children: []
        },
        {
          id: 4,
          icon: "page",
          name: "การแจ้งเตือน",
          url: "/dashboard/pages3",
          priority: 4,
          children: []
        },
        {
          id: 5,
          icon: "page",
          name: "การตั้งค่า",
          url: "/dashboard/pages4",
          priority: 5,
          children: []
        }
      ]
    };
    
    try {
      // For testing: use mock login
      if (username == "fms" && password == "123456") {
        // Create a mock authentication cookie
        const cryp = new Cryp({});
        const mockCookie = {
          keyId: "mock-key-id",
          dynamicKey: "mock-dynamic-key",
          pk: "mock-pk",
          token: "mock-token-12345",
          auth: true,
          role: mockProfile.role_level,
        };
        const encryptedCookie = cryp.encrypt(JSON.stringify(mockCookie));
        
        // Set cookie with 4 hour expiration
        setCookie(Config.COOKIE_NAME, encryptedCookie, {
          maxAge: 60 * 60 * 4,
        });

        // Call success handler
        handleSubmitSuccess(mockProfile);
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
      
      // TODO: Uncomment this when ready to use real API
      // const [error, profile] = await Auth.signin(username, password);
      // if (error || !profile) {
      //   setError(error || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      // } else {
      //   handleSubmitSuccess(profile);
      // }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/TailAdmin/dashboard"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div> */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              FMS.ZONE
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ระบบบริหารจัดการฟาร์มครบวงจร
            </p>
          </div>
          <div>
            <form onSubmit={handleSignIn}>
              {error && (
                <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
                  <p className="text-sm text-error-700 dark:text-error-400">{error}</p>
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <Label>
                    User : <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="ใส่ชื่อผู้ใช้งานของท่าน"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label>
                    Password : <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="ใส่รหัสผ่านของท่าน"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      จำข้อมูลการเข้าระบบ
                    </span>
                  </div>
                  <Link
                    to="#!"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ลืมรหัสผ่าน ?
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="w-full" size="sm" disabled={loading}>
                    {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
