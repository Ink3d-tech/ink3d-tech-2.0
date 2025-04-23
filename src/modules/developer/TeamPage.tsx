import { teamMembers } from "./TeamData";
import TeamMember from "./TeamMember";

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="relative mb-16">
            <h1 className="text-5xl md:text-7xl font-bold uppercase relative z-10 
                            text-gray-800">
                EQUIPO DE DESAROLLO
            </h1>
            <div className="absolute -bottom-3 left-0 h-1 w-32 bg-pink-500"></div>
            <div className="absolute -bottom-6 left-12 h-1 w-48 bg-purple-500"></div>
            <div className="absolute -bottom-9 left-24 h-1 w-24 bg-cyan-500"></div>
            </div>
            
            <p className="text-xl  mb-12 max-w-4xl text-gray-600">
                El código limpio siempre parece escrito por alguien a quien le importa. De Robert C. Martin
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {teamMembers.map((member) => (
                    <TeamMember key={member.id} member={member} />
                ))}
            </div>
        </div>
    )
}