import Login from "@/components/Login";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 border-box w-full">
      <h1 className="font-bold text-[35px] mt-8">TeacHR</h1>
      <Login />
    </div>
  );
}
