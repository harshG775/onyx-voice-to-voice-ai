import { Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import NotFoundPage from "./routes/not-found";
import Loading from "./routes/loading";
import RootLayout from "./routes/layout";
import RootPage from "./routes/page";
import { ErrorBoundary } from "./ErrorBoundary";

export default function AppRouter() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <ErrorBoundary>
                    <RootLayout>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </RootLayout>
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
