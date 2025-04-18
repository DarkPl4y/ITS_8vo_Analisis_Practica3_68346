import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // Asegúrate de tener instalado react-router-dom
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobación periódica cada segundo
    const checkToken = setInterval(() => {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("token_expiration");

      // Si no hay token o si el token está expirado, redirige al login
      if (!token || !tokenExpiration || Date.now() / 1000 > Number(tokenExpiration)) {
        clearInterval(checkToken);
        navigate("/signin");
      }
    }, 1000); // cada 1 segundo

    return () => clearInterval(checkToken);
  }, [navigate]);

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

