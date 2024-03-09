import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useAuth(code) {
    const prevCodeRef = useRef(null);
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        if (!code || code === prevCodeRef.current) return;

        axios
            .post("http://localhost:3001/login", { code })
            .then((res) => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, null, "/");
            })
            .catch(() => {
                window.location = "/";
            });
        prevCodeRef.current = code;
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;

        const interval = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", { refreshToken })
                .then((res) => {
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                    window.history.pushState({}, null, "/");
                })
                .catch(() => {
                    window.location = "/";
                });
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
