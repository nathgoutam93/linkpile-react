export default function LinkCard({ link, linkStyle }) {
  return (
    <a
      href={link.link}
      target="_blank"
      rel="noreferrer"
      className={`w-full max-w-4xl min-h-[4rem] px-4 flex justify-center items-center ${linkStyle}`}
    >
      <div className="p-2 flex flex-col text-center space-y-1 lg:space-y-0">
        <p className="text-lg font-bold">{link.title}</p>
        <p className="text-base font-semibold max-w-2xl">{link.description}</p>
      </div>
    </a>
  );
}
