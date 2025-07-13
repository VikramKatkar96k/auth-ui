import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useToast } from "@/hooks/use-toast";
import SetuForm from "../forms/SetuForm.tsx";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";


const Container = styled.div`
  padding: 30px;
  font-family: "Segoe UI", sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2e3b4e;
  padding: 12px 24px;
  color: #fff;
  border-radius: 8px;
  margin-bottom: 25px;

  .brand {
    font-size: 20px;
    font-weight: bold;
  }

  .nav-links {
    display: flex;
    gap: 20px;

    a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WelcomeText = styled.div`
  font-size: 18px;
  color: #444;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #ff5757;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e53935;
  }
`;

const SearchInput = styled.input`
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  margin: 20px 0;
  border-radius: 6px;
  width: 100%;
  max-width: 300px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    background-color: #f0f8ff;
  }
`;

const Suggestions = styled.div`
  margin-top: 40px;

  h3 {
    color: #333;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
    li {
      color: #555;
      line-height: 1.6;
    }
  }
`;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("Loading..."); // ✅ Moved here
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUsername(res.data.username);
      } catch (err) {
        setUsername("Guest");
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  const formCategories = [
    { name: "SETU Form", route: "/forms/setu" },
    { name: "Caste Validity", route: "/forms/castevalidity" },
    { name: "Ration Card", route: "/forms/ration" },
    { name: "CSC Form", route: "/forms/csc" },
    { name: "Education Form", route: "/forms/education" },
  ];

  const filteredForms = formCategories.filter((form) =>
    form.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = async () => {
  try {
    await api.post("/api/auth/logout"); // will auto use baseURL + withCredentials
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate("/login");
  } catch (err) {
    toast({
      title: "Logout failed",
      description: "Please try again.",
      variant: "destructive",
    });
  }
};

  const handleFormClick = (route: string) => {
    // For now, show a toast since the routes don't exist yet
    navigate(route);
    toast({
      title: "Form Navigation",
      description: `Navigating to ${route}`,
    });
    // navigate(route); // Uncomment when routes are implemented
  };

  return (
    <Container>
      <Navbar>
        <div className="brand">🛂 PaperPath Portal</div>
        <div className="nav-links">
          <a href="/dashboard">Home</a>
          <a href="/profile">Profile</a>
          <a href="/test">Support</a>
        </div>
      </Navbar>

      <Header>
        <WelcomeText>Welcome back, {username} 👋</WelcomeText>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <SearchInput
        placeholder="🔍 Search for a form..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid>
        {filteredForms.map((form, index) => (
          <Card key={index} onClick={() => handleFormClick(form.route)}>
            {form.name}
          </Card>
        ))}
      </Grid>

      <Suggestions>
        <h3>📌 Suggested for You</h3>
        <ul>
          <li>Track your SETU application</li>
          <li>Apply for new caste validity certificate</li>
          <li>Update address in your ration card</li>
        </ul>
      </Suggestions>
    </Container>
  );
}
