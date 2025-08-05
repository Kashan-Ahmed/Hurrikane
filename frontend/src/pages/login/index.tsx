import AuthLayout from '@/components/layouts/AuthLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import InputField from '@/components/common/InputField';
import Checkbox from '@/components/common/Checkbox';
import Button from '@/components/common/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, TLoginPayload, getUserProfile } from '@/apis/auth';
import { getAuthActions } from '@/store/auth-store';
import QUERY_KEYS from '@/configs/api-query-keys';
import ROUTE_CONSTANTS from '@/routes/routes.constants';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be atleast 6 characters long'),
  remember: z.boolean().default(false).optional(),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  const errors = form.formState.errors;
  const { setUserData, setTokens } = getAuthActions();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (payload: TLoginPayload) => {
  //     return login(payload);
  //   },
  // });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const profileData = {
      id: 1,
      parent: null,
      first_name: '',
      last_name: '',
      email: 'admin@alvayria.com',
      role: 'superuser',
      phone_number: null,
    };
    // await queryClient.fetchQuery<TUser>({
    //   queryKey: [QUERY_KEYS.USER_PROFILE],
    //   queryFn: getUserProfile,
    // });

    setUserData(profileData);
    setTokens({
      access: 'mock-access-token',
      refresh: 'mock-refresh-token',
    });

    navigate(ROUTE_CONSTANTS.DASHBOARD);
    return;
    const payload: TLoginPayload = {
      email: data.email,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: async () => {
        const profileData = {
          id: 1,
          parent: null,
          first_name: '',
          last_name: '',
          email: 'admin@alvayria.com',
          role: 'superuser',
          phone_number: null,
        };
        // await queryClient.fetchQuery<TUser>({
        //   queryKey: [QUERY_KEYS.USER_PROFILE],
        //   queryFn: getUserProfile,
        // });

        setUserData(profileData);
        navigate(ROUTE_CONSTANTS.DASHBOARD);
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Login Error',
          description: error.message,
        });
      },
      onSettled: () => {},
    });
  };

  return (
    <AuthLayout>
      <div>
        <div className="mb-6">
          <p className="text-xl font-medium text-black">Sign in with your credentials</p>
          <p className="text-xs text-primary">Continue to Hurrikane Knit</p>
        </div>
        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Controller
                  name="email"
                  render={({ field }) => {
                    return (
                      <InputField
                        {...field}
                        label="Email or Username"
                        placeholder="Enter email"
                        error={errors.email?.message}
                      />
                    );
                  }}
                  control={form.control}
                />
              </div>
              <div className="mb-3">
                <Controller
                  name="password"
                  render={({ field }) => {
                    return (
                      <InputField
                        {...field}
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        error={errors.password?.message}
                      />
                    );
                  }}
                  control={form.control}
                />
              </div>

              <div className="my-4 flex items-center justify-between">
                <Controller
                  name="remember"
                  render={({ field }) => {
                    return (
                      <Checkbox
                        name="remember"
                        checked={!!field.value}
                        onChange={(value) => field.onChange(value)}
                        label="Remember me"
                      />
                    );
                  }}
                  control={form.control}
                />
                <p className="text-xxs font-medium text-primary">Forgot Password?</p>
              </div>

              <div className="mb-7 w-full">
                <Button className="w-full" disabled={false}>
                  Sign In
                </Button>
              </div>

              <p className="mb-4 text-xxs text-primary">
                By proceeding, you agree to the{' '}
                <span className="text-nowrap font-medium">Terms and Conditions</span>
                and <span className="text-nowrap font-medium">Privacy Policy</span>
              </p>

              <div className="mb-4 flex items-center gap-2 text-xxs text-primary">
                <p>Help</p>
                <p>Privacy</p>
                <p>Terms</p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
