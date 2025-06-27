import { Url } from "next/dist/shared/lib/router/router";

export interface CardmarkInterface {
  title: String;
  link: String;
  type: "youtube" | "bookmark" | "photos";
  description: String;
}

export const Cardmark = (props: CardmarkInterface) => {
  return (
    <div className="w-64 h-108 bg-[#191919] text-white">
      <div>{props.title}</div>
      <div>
        {props.type == "youtube" ? (
          <iframe
            className="w-60"
            height="auto"
            src={props.link.replace("youtu.be", "www.youtube.com/embed")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          ""
        )}
      </div>
      <div>{props.description}</div>
    </div>
  );
};
