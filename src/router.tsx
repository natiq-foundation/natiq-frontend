import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "routes/intro";
import Apps from "routes/apps";
import Iframe from "routes/iframe";
import Quran from "routes/quran";
import NotFound from "not-found";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Intro />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/iframe" element={<Iframe />} />
                <Route path="/quran" element={<Navigate replace to="/" />} />
                <Route path="/quran/:id" element={<Quran />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
