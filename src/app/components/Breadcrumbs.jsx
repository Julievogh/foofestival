import Link from "next/link";

const Breadcrumbs = ({ paths }) => {
  return (
    <div>
      {" "}
      {/* Adjust margin-top as needed */}
      {paths.map((path, index) => (
        <span
          style={{ marginTop: "80px", marginLeft: "40px" }}
          key={index}
          className="inline-flex items-center ml-4 mt-2"
        >
          <Link href={path.href}>
            <div className="mr-2">{path.label}</div>
          </Link>
          {index < paths.length - 1 && <span className="ml-1 mr-1"> / </span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
