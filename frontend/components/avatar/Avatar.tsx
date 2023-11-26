import React from "react";

type Props = {
    names: string[];
    size?: number;
    name?: string;
    sizeIconRemove?: number;
    removeIcon?: boolean;
    onTouch?: () => void;
    isOnline?: boolean;
    type?:"round"|"horizontal"
};

export const Avatar: React.FC<Props> = ({
                                            isOnline,
                                            name,
                                            names = [],
                                            size = 50,
                                            sizeIconRemove,
                                            removeIcon,
                                            onTouch,
                                            type="round"
                                        }) => {
    if (name) names.push(name);
    if(type==="horizontal") return (
        <div style={{position: "relative"}} onTouchEnd={onTouch}>
            <AvatarHorizontal names={names} size={size}/>
        </div>
    )
    switch (names.length) {
        case 1:
            return (
                <div style={{position: "relative"}} onTouchEnd={onTouch}>
                    <AvatarSingle name={names[0]} size={size}/>
                </div>
            );

        case 2:
            return (
                <div style={{position: "relative"}} onTouchEnd={onTouch}>
                    <AvatarDouble names={names} size={size}/>
                </div>
            );

        case 3:
            return (
                <div style={{position: "relative"}} onTouchEnd={onTouch}>
                    <AvatarTriple names={names} size={size}/>
                </div>
            );

        case 4:
            return (
                <div style={{position: "relative"}} onTouchEnd={onTouch}>
                    <AvatarQuadruple names={names} size={size}/>
                </div>
            );

        default:
            return (
                <div style={{position: "relative"}} onTouchEnd={onTouch}>
                    <AvatarMore names={names} size={size}/>
                </div>
            );
    }
};

const bgColors = [
    // from https://flatuicolors.com/
    "#2ecc71", // emerald
    "#3498db", // peter river
    "#8e44ad", // wisteria
    "#e67e22", // carrot
    "#e74c3c", // alizarin
    "#1abc9c", // turquoise
    "#2c3e50", // midnight blue
];


const AvatarHorizontal: React.FC<Props> = ({names, size = 50}) => {
    return (
        <div
            style={{
                display: "flex",
                width: `${names.length * size/2}px`,
                height: `${size}px`,
                justifyContent: "left",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                }}
            >
                {names.map((name,index)=>(
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: `${index*80}%`,
                            backgroundColor: "#fff",
                            padding: 2,
                            borderRadius: `${size / 2}px`,
                            zIndex: `${index}`,
                        }}
                        key={index}
                    >
                        <AvatarSingle name={names[0]} size={size / 2}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AvatarSingle: React.FC<Omit<Props, "names">> = ({name, size = 50}) => {
    let fullName = name || "U K";

    const words = fullName.trim().split(" ");
    const nameTemp = [words[0], words[words.length - 1]]
        .reduce((acc, cur) => {
            return acc + cur[0];
        }, "")
        .toUpperCase();

    const sumChar = Array.from(fullName).reduce((acc, cur) => acc + cur.charCodeAt(0), 0);

    const i = sumChar % bgColors.length;
    const backgroundColor = bgColors[i];

    const fontSize = `${(9 * size) / 25}px`;

    return (
        <div style={{
            width: `${size}px`, height: `${size}px`, overflow: "hidden", borderRadius: `${size}px`,
            backgroundColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <p style={{
                fontSize: fontSize,
                fontWeight: "600",
                textAlign: "center",
                color: "#FFF"
            }}>
                {nameTemp}
            </p>
        </div>
    );
};

const AvatarDouble: React.FC<Props> = ({names, size = 50}) => {
    return (
        <div
            style={{
                display: "flex",
                width: `${size}px`,
                height: `${size}px`,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[0]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 9,
                    }}
                >
                    <AvatarSingle name={names[1]} size={size / 2}/>
                </div>
            </div>
        </div>
    );
};

const AvatarTriple: React.FC<Props> = ({names, size = 50}) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                justifyContent: "center",
                alignItems: "center",
                display:"flex",
                flexDirection:"column",
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                    zIndex: 100,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "15%",
                        left: "-10%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <AvatarSingle name={names[0]} size={size / 2}/>
                </div>
            </div>

            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[1]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <AvatarSingle name={names[2]} size={size / 2}/>
                </div>
            </div>

        </div>
    );
};

const AvatarQuadruple: React.FC<Props> = ({names, size = 50}) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                display:"flex",
                flexDirection:"column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[0]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <AvatarSingle name={names[1]} size={size / 2}/>
                </div>
            </div>

            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[2]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <AvatarSingle name={names[3]} size={size / 2}/>
                </div>
            </div>
        </div>
    );
};

const AvatarMore: React.FC<Props> = ({names, size = 50}) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                justifyContent: "center",
                alignItems: "center",
                display:"flex",
                flexDirection:"column",
            }}
        >
            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[0]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <AvatarSingle name={names[1]} size={size / 2}/>
                </div>
            </div>

            <div
                style={{
                    flexDirection: "row",
                    position: "relative",
                    width: `${size / 2}px`,
                    height: `${size / 2}px`,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                        zIndex: 10,
                    }}
                >
                    <AvatarSingle name={names[2]} size={size / 2}/>
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "-55%",
                        backgroundColor: "#fff",
                        padding: 2,
                        borderRadius: `${size / 2}px`,
                    }}
                >
                    <div
                        style={{
                            display:"flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "gray",
                            width: `${size / 2}px`,
                            height: `${size / 2}px`,
                            borderRadius: `${size / 2}px`,
                            overflow: "hidden",
                        }}
                    >
                        <p
                            style={{
                                fontSize: (10 * size) / 50,
                                color: "black",
                                textAlign: "center",
                                paddingLeft: 3,
                            }}
                        >
                            {names.length - 3}+
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
