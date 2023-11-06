import {FC} from "react";

type Props = {
    title?: string;
}
export const NavSearch: FC<Props> = ({title}) => {
    return <div className=" mx-auto px-2">
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
        </div>
    </div>
}
