import { signOut, useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store";
import { signIn, signOut as signOutAction } from "../../store/slices/auth";

interface InitCompoentProps {
    children: React.ReactNode;
}

const InitComponent: FC<InitCompoentProps> = (props) => {
    const { status, data} = useSession();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(status === 'authenticated') {
            dispatch(signIn({ 
                token: data.user.token,
                accountStatus: data.user.accountStatus,
                customer: {
                    customerId: data.user.customerId,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName
                }
            })) 
        }
        if(status === 'unauthenticated') {
            dispatch(signOutAction()) 
        }
    }, [status, dispatch, data])
    return (
        <>
        {props.children}
        </>
    )
}

export default InitComponent;