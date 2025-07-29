import { useNavigate } from "react-router-dom";
function Home() {

    const navigate=useNavigate();

    const handleRegister=()=>{navigate("/register");}
    const handleLogin=()=>{navigate("/login");}
    return (
        <div className="px-4 py-8 sm:px-8">
            <div className="mb-6">
                <h1 className="text-4xl sm:text-6xl md:text-8xl text-[#A5D7E8] text-center font-bold">
                Grab A Component!
                </h1>
            </div>

            <div className="mb-6">
                <p className="text-center text-base sm:text-xl md:text-2xl max-w-2xl mx-auto text-gray-200">
                Grab A Component is the portal you need to rent and buy electronic
                components to complete your projects and bring life to your ideas.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button onClick={handleRegister} className="bg-[#19376D] text-lg sm:text-xl cursor-pointer text-white font-bold py-2 px-6 rounded border border-[#A5D7E8] hover:bg-[#7dbfd1] transition">
                Register Now!
                </button>
                <button onClick={handleLogin} className="bg-[#19376D] text-lg sm:text-xl cursor-pointer text-white font-bold py-2 px-6 rounded border border-[#A5D7E8] hover:bg-[#7dbfd1] transition">
                Login Now!
                </button>
            </div>
        </div>
    );
}

export default Home;
