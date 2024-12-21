import { AbsIcon } from "./abs-icon";
import { ArmsIcon } from "./arms-icon";
import { BackIcon } from "./back-icon";
import { ChestIcon } from "./chest-icon";
import { LegsIcon } from "./legs-icon";
import { ShouldersIcon } from "./shoulders-icon";


interface MuscleGroupIconProps {
    muscleGroupId: number;
}
const getMuscleGroupIcon = (muscleGroupId: number) => {
    switch (muscleGroupId) {
        case 1:
            return <ChestIcon />;
        case 2:
            return <BackIcon />;
        case 3:
            return <LegsIcon />;
        case 4:
            return <ShouldersIcon />;
        case 5:
            return <ArmsIcon />;
        case 6:
            return <AbsIcon />;
        default:
            return null;
    }
}
const MuscleGroupIcon: React.FC<MuscleGroupIconProps> = ({ muscleGroupId, ...props }) => {
    return <div className='text-foreground w-7 h-7 svg-icon-container flex items-center justify-center'>
        {getMuscleGroupIcon(muscleGroupId)}
    </div>
};

export default MuscleGroupIcon; 