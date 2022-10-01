import React from "react";
import Cards from "../../Cards/LengthyCards/Cards";

const Tags = ({ name }) => {
  return <div className="px-2 py-1 border mx-2 my-2 text-gray-500">{name}</div>;
};

const Footer = ({ name }) => {
  return (
    <div className="px-2 cursor-pointer hover:underline hover:underline-offset-4 mx-2 my-1 text-gray-500">
      {name}
    </div>
  );
};


const data = [
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
    {
      username: "Karan",
      title: "Ukraine War, 4 September 2022: Ukranian attack in Kherson Oblast",
      data: "Sep 4",
      tag: "Politics",
      desc: "this is the testing data which is not actually true so ignore it. and move forward with further functins.",
    },
  ];
  

const tag = [
  "Self",
  "Relationships",
  "Data Science",
  "Programming",
  "Productivity",
  "Javascript",
  "Machine Learning",
  "Politics",
  "Health",
];

const foot = [
  "Help",
  "Status",
  "Writers",
  "Blog",
  "Carrers",
  "Privacy",
  "Terms",
  "About",
  "Knowable",
];

const Allblogs = () => {
  return (
    <div className="sm:flex w-full my-10">
      <Cards data={data} />
      <div className="flex sm:w-5/12 overflow-auto flex-col space-x-4">
        <span className="text-left text-xl sm:text-sm px-6 mt-8 uppercase font-semibold text-[#52ab98]">
          Discover More of What Matters To You
        </span>
        <div className="flex flex-wrap text-sm">
          {tag.map((val, index) => (
            <Tags key={index} name={val} />
          ))}
        </div>
        <hr className="mt-5" />
        <div className="flex flex-wrap text-sm mt-4">
          {foot.map((val, index) => (
            <Footer key={index} name={val} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allblogs