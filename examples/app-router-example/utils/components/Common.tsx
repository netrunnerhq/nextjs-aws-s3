export const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "100px",
        width: "100%",
        backgroundColor: "black",
      }}
    />
  );
};

export const Header = () => (
  <header className="text-white fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 bg-black text-lg">
    Next.js to AWS S3 upload file example
  </header>
);
