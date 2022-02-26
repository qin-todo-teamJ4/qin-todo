import type { VFC } from "react";

export const AppleIcon: VFC<{ className?: string }> = (props) => {
  return (
    <svg
      className={props.className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M21.792 18.7038C21.429 19.5423 20.9994 20.3141 20.5017 21.0237C19.8232 21.9911 19.2676 22.6607 18.8395 23.0325C18.1758 23.6429 17.4647 23.9555 16.7033 23.9732C16.1566 23.9732 15.4974 23.8177 14.73 23.5021C13.9601 23.1881 13.2525 23.0325 12.6056 23.0325C11.9271 23.0325 11.1994 23.1881 10.4211 23.5021C9.64155 23.8177 9.01356 23.9821 8.53343 23.9984C7.80323 24.0295 7.0754 23.7081 6.3489 23.0325C5.88522 22.6281 5.30523 21.9348 4.61044 20.9526C3.86498 19.9037 3.25211 18.6875 2.77198 17.3009C2.25777 15.8031 2 14.3528 2 12.9487C2 11.3403 2.34755 9.95308 3.04367 8.79059C3.59077 7.85685 4.3186 7.12027 5.22953 6.57955C6.14047 6.03883 7.12473 5.76328 8.1847 5.74565C8.76468 5.74565 9.52525 5.92505 10.4704 6.27763C11.4129 6.6314 12.0181 6.8108 12.2834 6.8108C12.4818 6.8108 13.154 6.60103 14.2937 6.18282C15.3714 5.79498 16.281 5.63439 17.0262 5.69765C19.0454 5.86061 20.5624 6.65658 21.5713 8.09062C19.7654 9.1848 18.8721 10.7173 18.8899 12.6834C18.9062 14.2147 19.4617 15.4891 20.5535 16.5009C21.0483 16.9705 21.6009 17.3334 22.2157 17.5912C22.0824 17.9779 21.9416 18.3482 21.792 18.7038V18.7038ZM17.161 0.480625C17.161 1.6809 16.7225 2.80159 15.8485 3.83889C14.7937 5.07204 13.5179 5.78461 12.1344 5.67217C12.1167 5.52817 12.1065 5.37662 12.1065 5.21737C12.1065 4.06511 12.6081 2.83196 13.4989 1.82369C13.9436 1.31319 14.5092 0.888716 15.1952 0.550104C15.8796 0.216543 16.527 0.0320773 17.1358 0.000488281C17.1536 0.160946 17.161 0.321414 17.161 0.480609V0.480625Z" />
    </svg>
  );
};
