import {AutoCrud} from "@hilla/react-crud";
import {UserManageHandler} from "Frontend/generated/endpoints";
import UserModel from "Frontend/generated/com/hillarocket/application/domain/UserModel";

export  const UserManagement = () =>{
    return <AutoCrud service={UserManageHandler} model={UserModel}
                     gridProps={{ visibleColumns: ["fullName", "email","role"] }}
                     formProps={{ visibleFields: ["fullName", "email","role"] }}
                     style={{height:"90vh"}}
    />
}