import {FC, useState} from "react";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {type ConfirmDialogOpenedChangedEvent,} from '@hilla/react-components/ConfirmDialog.js';
import {CreateGroup} from "Frontend/components/dialog/create-group";

type Props = {
    title?: string;
}
export const NavSearch: FC<Props> = ({title}) => {

    const [dialogOpened, setDialogOpened] = useState(true);
    const [status, setStatus] = useState('');

    function openedChanged(event: ConfirmDialogOpenedChangedEvent) {
        setDialogOpened(event.detail.value);
        if (event.detail.value) {
            setStatus('');
        }
    }


    return <HorizontalLayout className="mb-4 px-2 space-x-4">
        <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <CreateGroup openedChanged={openedChanged} handleStatus={setStatus} opened={dialogOpened}/>
    </HorizontalLayout>
}
