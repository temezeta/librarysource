export type Dictionary<T> = {
    [Key: string]: T;
};

export type IconProps = {
    style?: React.CSSProperties;
    onClick?: () => void;
    className?: string;
};
