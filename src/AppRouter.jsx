import { Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";
import NotFoundPage from "./routes/not-found";
import Loading from "./routes/loading";
import RootLayout from "./routes/layout";
import RootPage from "./routes/page";
import Providers from "./components/providers/providers";

export default function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ErrorBoundary>
                    <Providers>
                        <RootLayout>
                            <Suspense fallback={<Loading />}>
                                <Outlet />
                            </Suspense>
                        </RootLayout>
                    </Providers>
                </ErrorBoundary>
            ),
            children: [
                {
                    index: true,
                    element: <RootPage />,
                },
                {
                    path: "*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}
