import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface SignupResponse {
  status: string;
  message: string;
  name: string;
}

interface SignupError {
  message: string;
  status?: number;
}

const signupUser = async (formData: FormData): Promise<SignupResponse> => {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Signup failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = `Signup failed with status ${response.status}`;
    }

    const error: SignupError = {
      message: errorMessage,
      status: response.status,
    };
    throw error;
  }

  return response.json();
};

const useSignup = (
  options?: Omit<
    UseMutationOptions<SignupResponse, SignupError, FormData>,
    "mutationFn"
  >
) => {
  return useMutation<SignupResponse, SignupError, FormData>({
    mutationFn: signupUser,
    retry: 1,
    ...options,
  });
};

export default useSignup;
export type { SignupResponse, SignupError };
