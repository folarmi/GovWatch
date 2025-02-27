import React from "react";

interface TeamProps {
  img: string;
  name: string;
  role?: string;
  link?: string;
}

const Team: React.FC<TeamProps> = ({ img, name, role, link }) => {
  return (
    <a href={link} target="_blank">
      <div className="bg-white flex gap-4 border border-black rounded-2xl w-max">
        <img
          className="ml-4 my-4 rounded-xl"
          height={150}
          width={150}
          // style={{
          //   width: "auto",
          //   height: "auto",
          // }}
          src={img}
          alt={name}
        />
        <div className="py-4 pr-4">
          <h1 className="font-bold text-2xl mb-1 whitespace-nowrap">{name}</h1>
          <p className="w-80">{role}</p>
        </div>
      </div>
    </a>
  );
};

export default Team;
