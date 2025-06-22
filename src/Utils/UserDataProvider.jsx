import { auth, provider } from "../Config/firebaseAuth"
import { signInWithPopup, signOut } from "firebase/auth"
import { useState , useEffect} from 'react'
import { userDataContext } from './Context'

const UserDataProvider = ({ children }) => {

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || null)
    const [loginSideBarVisible, setLoginVisibleSideBar] = useState(false)



    function handelLoginSideBar() {
        setLoginVisibleSideBar(prev => !prev)
    }

    useEffect(() => {

        if (loginSideBarVisible) {
            document.body.classList.add("overflow-hidden");
        }else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [loginSideBarVisible]);

    

    async function handelAuth() {
        const data = await signInWithPopup(auth, provider)

        const newUser = {
            name: data?.user?.displayName,
            profilePhoto: data?.user?.photoURL
        }

        setUserData(newUser);
        localStorage.setItem("userData", JSON.stringify(newUser))
    }


    function handelLogOut() {
        signOut(auth).then(() => {
            setUserData(null);
            localStorage.removeItem("userData")
        }).catch((error) => {
            console.error("Sign out error:", error);
        });
    }



    return (
        <userDataContext.Provider value={{ userData, setUserData, handelAuth, handelLogOut, handelLoginSideBar, loginSideBarVisible }}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserDataProvider
