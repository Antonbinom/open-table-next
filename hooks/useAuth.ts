import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";

const useAuth = () => {
	const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

	const signIn = async ({ email, password }: { email: string; password: string }, handleClose: () => void) => {
		try {
			setAuthState({
				data: null,
				error: null,
				loading: true,
			});
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, { email, password });
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
			handleClose();
		} catch (error: any) {
			console.log(error);
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};

	const signUp = async (
		{
			firstName,
			lastName,
			email,
			password,
			city,
			phone,
		}: {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
			phone: string;
			city: string;
		},
		handleClose: () => void
	) => {
		try {
			setAuthState({
				data: null,
				error: null,
				loading: true,
			});
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
				firstName,
				lastName,
				city,
				phone,
				email,
				password,
			});
			setAuthState({
				data: response.data,
				error: null,
				loading: false,
			});
			handleClose();
		} catch (error: any) {
			console.log(error);
			setAuthState({
				data: null,
				error: error.response.data.errorMessage,
				loading: false,
			});
		}
	};
	return { signIn, signUp };
};

export default useAuth;
