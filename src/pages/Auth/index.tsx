import { TextInput, Button, PasswordInput, Image, Dialog, Text } from "@mantine/core";
import s from "./Auth.module.scss";
import { useState } from "react";
import logo from "../../assets/earth.jpg";
import React from "react";
import { useNavigate } from "react-router";
import { RoutesEnum } from "../../AppRoutes";
import { useAuth } from "../../utils/hooks/useAuth";
import { USERS } from "../../shared/auth/users";

export const AuthPage = (): React.ReactNode => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!userData.login.trim()) {
      setError("Введите логин");
      return;
    }
    if (!userData.password.trim()) {
      setError("Введите пароль");
      return;
    }
    if (
      USERS.find(
        (user) =>
          user.password === userData.password &&
          user.username === userData.login
      )
    ) {
      login(userData.login);
      navigate(RoutesEnum.AllReports, { replace: true });
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className={s.root}>
      <Dialog opened={true}>
        <Text size="sm">
          Пароль: admin
        </Text>
        <Text size="sm">
          Логин: admin
        </Text>
      </Dialog>
      <form className={s.form}>
        <Image src={logo} alt="logo" className={s.logo} />
        <TextInput
          label="Логин"
          placeholder="Введите ваш логин"
          onChange={(event) =>
            setUserData({ ...userData, login: event.currentTarget.value })
          }
        />
        <PasswordInput
          label="Пароль"
          placeholder="Введите ваш пароль"
          onChange={(event) =>
            setUserData({ ...userData, password: event.currentTarget.value })
          }
        />
        <div className={s.error}>{error}</div>
        <Button onClick={handleLogin} color="orange" className={s.button} type="submit">
          Войти
        </Button>
      </form>
    </div>
  );
};
