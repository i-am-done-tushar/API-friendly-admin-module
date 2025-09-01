import React, { useState } from "react";
import { Search, Filter, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

interface Template {
  id: string;
  name: string;
  invitees: { initial: string; bgColor: string }[];
  createdDate: string;
  createdBy: string;
  status: "Completed" | "In Progress";
  lastUpdated: string;
}

const Templates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  // Static data - replace with API calls later
  const templates: Template[] = [
    {
      id: "1",
      name: "Template Name",
      invitees: [
        { initial: "OP", bgColor: "#F4DEE4" },
        { initial: "VS", bgColor: "#DAE5E6" },
        { initial: "+5", bgColor: "#F1F2F4" },
      ],
      createdDate: "14-07-2024",
      createdBy: "Patricia A. Ramirez",
      status: "Completed",
      lastUpdated: "14-07-2024",
    },
    {
      id: "2",
      name: "New Template",
      invitees: [
        { initial: "OP", bgColor: "#E0DAEE" },
        { initial: "VS", bgColor: "#FFE6DE" },
        { initial: "+4", bgColor: "#F1F2F4" },
      ],
      createdDate: "22-06-2024",
      createdBy: "Deloris L. Hall",
      status: "Completed",
      lastUpdated: "22-06-2024",
    },
    {
      id: "3",
      name: "Template_Newname",
      invitees: [
        { initial: "OP", bgColor: "#E3F7F6" },
        { initial: "VS", bgColor: "#F4EBE8" },
        { initial: "+2", bgColor: "#F1F2F4" },
      ],
      createdDate: "18-06-2024",
      createdBy: "Carl H. Smith",
      status: "In Progress",
      lastUpdated: "18-06-2024",
    },
    // Add more template data as needed
  ];

  const NavigationItem = ({ icon, label, isActive = false }: { icon: React.ReactNode; label: string; isActive?: boolean }) => (
    <div className={`flex flex-col items-center justify-center gap-0.5 py-2 px-0 w-full cursor-pointer ${isActive ? 'relative' : ''}`}>
      <div className="w-[22px] h-[22px] flex items-center justify-center">
        {icon}
      </div>
      <div className={`text-[11px] font-semibold leading-5 text-center ${isActive ? 'text-[#172B4D]' : 'text-[#505258]'}`}>
        {label}
      </div>
      {isActive && (
        <div className="absolute left-0 top-2 w-0.5 h-14 bg-[#0073EA] rounded"></div>
      )}
    </div>
  );

  const StatusBadge = ({ status }: { status: "Completed" | "In Progress" }) => (
    <div 
      className={`inline-flex items-center justify-center px-2 py-1 rounded text-[13px] font-normal leading-5 ${
        status === "Completed" 
          ? "bg-[#BBDBC9] text-[#172B4D]" 
          : "bg-[#F3E1B0] text-[#402C1B]"
      }`}
    >
      {status}
    </div>
  );

  const InviteesGroup = ({ invitees }: { invitees: { initial: string; bgColor: string }[] }) => (
    <div className="flex items-center -space-x-1.5">
      {invitees.map((invitee, index) => (
        <div
          key={index}
          className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-[12px] font-medium text-[#505258]"
          style={{ backgroundColor: invitee.bgColor }}
        >
          {invitee.initial}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#DEDEDD] bg-white">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/4566b1e4f2b69299156b1f1c61472e06e0ad9666?width=180" 
          alt="Logo" 
          className="w-[90px] h-7"
        />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F65F7C] flex items-center justify-center">
            <span className="text-white text-[12px] font-medium">OS</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <div className="w-[72px] flex flex-col justify-between border-r border-[#DEDEDD] bg-white py-2">
          <div className="flex flex-col gap-1">
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11.9004 2.53385C11.5784 2.28337 11.4174 2.15813 11.2396 2.10998C11.0827 2.06751 10.9173 2.06751 10.7604 2.10998C10.5826 2.15813 10.4216 2.28337 10.0996 2.53385L3.88244 7.36938C3.46685 7.69262 3.25906 7.85423 3.10936 8.05664C2.97675 8.23592 2.87797 8.4379 2.81786 8.65265C2.75 8.89508 2.75 9.15832 2.75 9.68481V16.3168C2.75 17.3436 2.75 17.857 2.94982 18.2492C3.12559 18.5941 3.40605 18.8746 3.75102 19.0503C4.14319 19.2502 4.65657 19.2502 5.68333 19.2502H7.51667C7.77336 19.2502 7.9017 19.2502 7.99975 19.2002C8.08599 19.1563 8.1561 19.0862 8.20004 18.9999C8.25 18.9019 8.25 18.7735 8.25 18.5168V12.4668C8.25 11.9535 8.25 11.6968 8.34991 11.5007C8.43779 11.3282 8.57803 11.188 8.75051 11.1001C8.94659 11.0002 9.20329 11.0002 9.71667 11.0002H12.2833C12.7967 11.0002 13.0534 11.0002 13.2495 11.1001C13.422 11.188 13.5622 11.3282 13.6501 11.5007C13.75 11.6968 13.75 11.9535 13.75 12.4668V18.5168C13.75 18.7735 13.75 18.9019 13.8 18.9999C13.8439 19.0862 13.914 19.1563 14.0003 19.2002C14.0983 19.2502 14.2266 19.2502 14.4833 19.2502H16.3167C17.3434 19.2502 17.8568 19.2502 18.249 19.0503C18.5939 18.8746 18.8744 18.5941 19.0502 18.2492C19.25 17.857 19.25 17.3436 19.25 16.3168V9.68481C19.25 9.15832 19.25 8.89508 19.1821 8.65265C19.122 8.4379 19.0232 8.23592 18.8906 8.05664C18.7409 7.85423 18.5331 7.69262 18.1176 7.36938L11.9004 2.53385Z" stroke="#515257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Home"
            />
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.9167 1.84892C11.9167 1.82481 11.9167 1.81275 11.9157 1.79088C11.894 1.33826 11.4959 0.940409 11.0434 0.918996C11.0215 0.917962 11.0143 0.917965 11 0.917969H8.02877C7.29091 0.91796 6.6819 0.917952 6.18583 0.958486C5.67057 1.00058 5.19693 1.09094 4.75204 1.31762C4.06211 1.66915 3.50118 2.23008 3.14965 2.92001C2.92297 3.3649 2.83261 3.83854 2.79052 4.3538C2.74998 4.84988 2.74999 5.45888 2.75 6.19675V15.8058C2.74999 16.5437 2.74998 17.1527 2.79052 17.6488C2.83261 18.164 2.92297 18.6377 3.14965 19.0826C3.50118 19.7725 4.06211 20.3334 4.75204 20.685C5.19693 20.9117 5.67057 21.002 6.18583 21.0441C6.68192 21.0846 7.29091 21.0846 8.02879 21.0846H13.9712C14.7091 21.0846 15.3181 21.0846 15.8142 21.0441C16.3294 21.002 16.8031 20.9117 17.248 20.685C17.9379 20.3334 18.4988 19.7725 18.8503 19.0826C19.077 18.6377 19.1674 18.164 19.2095 17.6488C19.25 17.1527 19.25 16.5437 19.25 15.8058V9.16791C19.25 9.15368 19.25 9.14656 19.249 9.12472C19.2276 8.67204 18.8297 8.27395 18.3771 8.25236C18.3552 8.25131 18.3431 8.25131 18.3191 8.25131H14.2708C14.0394 8.25134 13.8141 8.25137 13.6233 8.23578C13.4138 8.21866 13.1665 8.17826 12.9177 8.05149C12.5727 7.87573 12.2922 7.59526 12.1165 7.25029C11.9897 7.00149 11.9493 6.75423 11.9323 6.54469C11.9166 6.35388 11.9167 6.12857 11.9167 5.89722V1.84892ZM7.33333 11.918C6.82708 11.918 6.41667 12.3284 6.41667 12.8346C6.41667 13.3409 6.82708 13.7513 7.33333 13.7513H14.6667C15.1729 13.7513 15.5833 13.3409 15.5833 12.8346C15.5833 12.3284 15.1729 11.918 14.6667 11.918H7.33333ZM7.33333 15.5846C6.82708 15.5846 6.41667 15.995 6.41667 16.5013C6.41667 17.0076 6.82708 17.418 7.33333 17.418H12.8333C13.3396 17.418 13.75 17.0076 13.75 16.5013C13.75 15.995 13.3396 15.5846 12.8333 15.5846H7.33333Z" fill="#0073EA"/>
                  <path d="M17.3323 6.41818C17.6015 6.41819 17.736 6.41819 17.8462 6.35061C18.002 6.25516 18.095 6.0303 18.0524 5.85273C18.0221 5.72701 17.9344 5.63933 17.7589 5.46398L14.7043 2.40935C14.5289 2.23382 14.4412 2.14606 14.3155 2.11584C14.1379 2.07316 13.9131 2.16623 13.8176 2.32192C13.75 2.43217 13.75 2.56674 13.75 2.8359V5.68482C13.75 5.94151 13.75 6.06985 13.8 6.16789C13.8439 6.25413 13.914 6.32424 14.0002 6.36819C14.0983 6.41815 14.2267 6.41815 14.4833 6.41815L17.3323 6.41818Z" fill="#0073EA"/>
                </svg>
              }
              label="Template"
              isActive={true}
            />
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M20.1663 9.16536H1.83301M10.083 12.832H5.49967M1.83301 7.51536V14.482C1.83301 15.5088 1.83301 16.0222 2.03283 16.4144C2.20859 16.7593 2.48906 17.0398 2.83403 17.2155C3.22619 17.4154 3.73957 17.4154 4.76634 17.4154H17.233C18.2598 17.4154 18.7732 17.4154 19.1653 17.2155C19.5103 17.0398 19.7908 16.7593 19.9665 16.4144C20.1663 16.0222 20.1663 15.5088 20.1663 14.482V7.51536C20.1663 6.48861 20.1663 5.97522 19.9665 5.58305C19.7908 5.23809 19.5103 4.95763 19.1653 4.78186C18.7732 4.58203 18.2598 4.58203 17.233 4.58203H4.76634C3.73958 4.58203 3.22619 4.58203 2.83403 4.78186C2.48907 4.95762 2.20859 5.23808 2.03283 5.58305C1.83301 5.97522 1.83301 6.4886 1.83301 7.51536Z" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Verification"
            />
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M15.5833 18.332H15.4C13.8598 18.332 13.0898 18.332 12.5015 18.0323C11.984 17.7686 11.5634 17.348 11.2998 16.8305C11 16.2422 11 15.4722 11 13.932V8.06536C11 6.52522 11 5.75514 11.2998 5.16689C11.5634 4.64944 11.984 4.22875 12.5015 3.9651C13.0898 3.66536 13.8598 3.66536 15.4 3.66536H15.5833M15.5833 18.332C15.5833 19.3446 16.4041 20.1654 17.4167 20.1654C18.4292 20.1654 19.25 19.3446 19.25 18.332C19.25 17.3195 18.4292 16.4987 17.4167 16.4987C16.4041 16.4987 15.5833 17.3195 15.5833 18.332ZM15.5833 3.66536C15.5833 4.67789 16.4041 5.4987 17.4167 5.4987C18.4292 5.4987 19.25 4.67789 19.25 3.66536C19.25 2.65284 18.4292 1.83203 17.4167 1.83203C16.4041 1.83203 15.5833 2.65284 15.5833 3.66536ZM6.41667 10.9987H15.5833M6.41667 10.9987C6.41667 12.0112 5.59586 12.832 4.58333 12.832C3.57081 12.832 2.75 12.0112 2.75 10.9987C2.75 9.98615 3.57081 9.16536 4.58333 9.16536C5.59586 9.16536 6.41667 9.98615 6.41667 10.9987ZM15.5833 10.9987C15.5833 12.0112 16.4041 12.832 17.4167 12.832C18.4292 12.832 19.25 12.0112 19.25 10.9987C19.25 9.98615 18.4292 9.16536 17.4167 9.16536C16.4041 9.16536 15.5833 9.98615 15.5833 10.9987Z" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Integration"
            />
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M8.25 6.41667H4.21667C3.70329 6.41667 3.44659 6.41667 3.25051 6.51657C3.07803 6.60446 2.9378 6.7447 2.84991 6.91718C2.75 7.11326 2.75 7.36995 2.75 7.88333V17.7833C2.75 18.2968 2.75 18.5534 2.84991 18.7495C2.9378 18.922 3.07803 19.0622 3.25051 19.1501C3.44659 19.25 3.70329 19.25 4.21667 19.25H8.25M8.25 19.25H13.75M8.25 19.25V4.21667C8.25 3.70329 8.25 3.44659 8.34991 3.25051C8.4378 3.07803 8.57803 2.9378 8.75051 2.84991C8.94659 2.75 9.20324 2.75 9.71667 2.75H12.2833C12.7968 2.75 13.0534 2.75 13.2495 2.84991C13.422 2.9378 13.5622 3.07803 13.6501 3.25051C13.75 3.44659 13.75 3.70329 13.75 4.21667V19.25M13.75 19.25H17.7833C18.2968 19.25 18.5534 19.25 18.7495 19.1501C18.922 19.0622 19.0622 18.922 19.1501 18.7495C19.25 18.5534 19.25 18.2968 19.25 17.7833V11.55C19.25 11.0366 19.25 10.7799 19.1501 10.5838C19.0622 10.4113 18.922 10.2712 18.7495 10.1833C18.5534 10.0833 18.2968 10.0833 17.7833 10.0833H13.75" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Analytics"
            />
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M10.3595 19.8203C10.5625 19.9387 10.6639 19.9979 10.8071 20.0286C10.9183 20.0525 11.0804 20.0525 11.1916 20.0286C11.3348 19.9979 11.4362 19.9387 11.6392 19.8203C13.4248 18.7786 18.3327 15.5061 18.3327 11.0067V6.62281C18.3327 5.88993 18.3327 5.52348 18.2128 5.20849C18.1069 4.93022 17.9348 4.68194 17.7115 4.48508C17.4586 4.26225 17.1155 4.13359 16.4293 3.87625L11.5143 2.03313C11.3238 1.96166 11.2285 1.92593 11.1304 1.91177C11.0435 1.8992 10.9552 1.8992 10.8683 1.91177C10.7702 1.92593 10.6749 1.96166 10.4844 2.03313L5.56938 3.87625C4.88317 4.13359 4.54006 4.26225 4.2872 4.48508C4.06383 4.68194 3.89176 4.93022 3.78588 5.20849C3.66602 5.52348 3.66602 5.88993 3.66602 6.62281V11.0067C3.66602 15.5061 8.57381 18.7786 10.3595 19.8203Z" stroke="#515257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Roles"
            />
            <NavigationItem
              icon={
                <div className="relative">
                  <svg width="11" height="17" viewBox="0 0 14 18" fill="none" className="absolute left-0.5 top-0.5">
                    <path d="M8.16634 12.2083H5.87467C4.59541 12.2083 3.95577 12.2083 3.4353 12.3662C2.26342 12.7217 1.34638 13.6388 0.990894 14.8107C0.833008 15.3311 0.833008 15.9707 0.833008 17.25M12.2913 4.875C12.2913 7.15317 10.4445 9 8.16634 9C5.88817 9 4.04134 7.15317 4.04134 4.875C4.04134 2.59683 5.88817 0.75 8.16634 0.75C10.4445 0.75 12.2913 2.59683 12.2913 4.875Z" stroke="#515257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="absolute right-0 bottom-0">
                    <path d="M7.91394 8.80809C8.67796 8.80854 9.29774 8.20937 9.29821 7.46974C9.29869 6.73011 8.67967 6.13019 7.91565 6.12973C7.15159 6.12928 6.53184 6.72846 6.53137 7.46808C6.5309 8.20771 7.14988 8.80763 7.91394 8.80809Z" stroke="#515257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.66455 10.7561L6.93369 11.343C7.01371 11.5177 7.14435 11.6662 7.30979 11.7704C7.47527 11.8747 7.66841 11.9302 7.86582 11.9303C8.06328 11.9305 8.25649 11.8752 8.42206 11.7711C8.58767 11.6671 8.7185 11.5187 8.79876 11.3441L9.06862 10.7575C9.16472 10.5494 9.32618 10.3759 9.53008 10.2618C9.73527 10.1474 9.97256 10.0987 10.208 10.1228L10.8674 10.1912C11.0637 10.2114 11.2619 10.1761 11.4378 10.0894C11.6137 10.0028 11.7599 9.86866 11.8587 9.70324C11.9576 9.53787 12.0047 9.34831 11.9945 9.15752C11.9842 8.96673 11.917 8.78291 11.8009 8.62839L11.4109 8.10882C11.272 7.92246 11.1978 7.69819 11.1992 7.46839C11.1993 7.23921 11.2744 7.01597 11.4137 6.83067L11.8045 6.3116C11.9207 6.15721 11.9882 5.97348 11.9987 5.78269C12.0092 5.59192 11.9622 5.40229 11.8636 5.23682C11.765 5.07125 11.619 4.93692 11.4432 4.8501C11.2673 4.76328 11.0693 4.7277 10.873 4.74768L10.2135 4.81524C9.97799 4.83903 9.74072 4.79011 9.53572 4.67546C9.33156 4.56047 9.17022 4.38589 9.0749 4.17671L8.80371 3.58979C8.72368 3.41508 8.59304 3.2666 8.42756 3.16235C8.26212 3.05809 8.06898 3.00256 7.87152 3.00247C7.67411 3.00232 7.4809 3.05763 7.31529 3.16168C7.14972 3.26573 7.01889 3.41406 6.93864 3.58867L6.66875 4.17527C6.57313 4.38433 6.4116 4.55873 6.20729 4.67347C6.00212 4.78787 5.7648 4.83651 5.52933 4.81243L4.8679 4.74409C4.67162 4.72387 4.47349 4.75921 4.29754 4.84582C4.1216 4.93243 3.97539 5.06659 3.87665 5.23204C3.77777 5.39739 3.7306 5.58696 3.74085 5.77775C3.75109 5.96855 3.81832 6.15236 3.93437 6.30689L4.32447 6.82642C4.46359 7.01189 4.53843 7.23522 4.53824 7.4644C4.53813 7.69358 4.46301 7.91686 4.32365 8.10212L3.93289 8.62118C3.81664 8.77556 3.74918 8.9593 3.73869 9.15008C3.7282 9.34086 3.77513 9.53052 3.87379 9.69596C3.97243 9.86146 4.11848 9.99573 4.29429 10.0825C4.4701 10.1693 4.66813 10.205 4.86442 10.1851L5.52389 10.1175C5.7594 10.0938 5.99664 10.1427 6.20168 10.2573C6.4066 10.372 6.56866 10.5466 6.66455 10.7561Z" stroke="#515257" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              }
              label="Users"
            />
          </div>
          <div className="flex justify-center">
            <NavigationItem
              icon={
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M8.33217 8.2487C8.54768 7.63606 8.97306 7.11947 9.53301 6.7904C10.0929 6.46134 10.7512 6.34106 11.3913 6.45085C12.0314 6.56065 12.6119 6.89342 13.0302 7.39027C13.4484 7.8871 13.6773 8.51592 13.6763 9.16536C13.6763 10.9987 10.9263 11.9154 10.9263 11.9154M10.9997 15.582H11.0088M20.1663 10.9987C20.1663 16.0613 16.0622 20.1654 10.9997 20.1654C5.93706 20.1654 1.83301 16.0613 1.83301 10.9987C1.83301 5.93609 5.93706 1.83203 10.9997 1.83203C16.0622 1.83203 20.1663 5.93609 20.1663 10.9987Z" stroke="#676879" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Help"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Page Header */}
          <div className="flex items-center justify-between px-4 py-2 h-[58px]">
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] font-bold leading-[30px] text-[#172B4D] font-roboto">Templates</h1>
            </div>
            <div className="flex items-center gap-1">
              {/* Filter Button */}
              <button className="flex items-center gap-1 px-2 py-2 h-8 rounded text-[13px] font-medium text-[#505258] hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              {/* Search */}
              <div className="flex items-center gap-1 px-3 py-0 w-[200px] h-8 border border-[#C3C6D4] rounded bg-white">
                <Search className="w-[18px] h-[18px] text-[#676879]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-[13px] text-[#676879] bg-transparent border-none outline-none"
                />
              </div>
              
              {/* Add New Button Group */}
              <div className="flex items-center">
                <button className="flex items-center px-3 h-8 bg-[#0073EA] text-white text-[12px] font-medium rounded-l">
                  Add New
                </button>
                <button className="flex items-center justify-center w-6 h-8 bg-[#0073EA] border-l border-[#0060B9] rounded-r">
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 px-4 pb-4">
            <div className="border border-[#DEDEDD] rounded overflow-hidden">
              {/* Table */}
              <div className="min-w-full">
                {/* Header */}
                <div className="bg-[#F6F7FB] grid grid-cols-12 gap-2 px-2 py-2 text-[13px] font-medium text-[#172B4D] border-b border-[#DEDEDD]">
                  <div className="col-span-3 px-2">Name</div>
                  <div className="col-span-2 px-2">Invitees</div>
                  <div className="col-span-2 px-2">Created Date</div>
                  <div className="col-span-2 px-2">Created By</div>
                  <div className="col-span-2 px-2">Status</div>
                  <div className="col-span-1 px-2">Last Updated</div>
                </div>
                
                {/* Table Body */}
                <div className="bg-white">
                  {templates.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((template) => (
                    <div key={template.id} className="grid grid-cols-12 gap-2 px-2 py-2 text-[13px] text-[#505258] border-b border-[#DEDEDD] hover:bg-gray-50">
                      <div className="col-span-3 px-2 flex items-center">
                        {template.name}
                      </div>
                      <div className="col-span-2 px-2 flex items-center">
                        <InviteesGroup invitees={template.invitees} />
                      </div>
                      <div className="col-span-2 px-2 flex items-center">
                        {template.createdDate}
                      </div>
                      <div className="col-span-2 px-2 flex items-center">
                        {template.createdBy}
                      </div>
                      <div className="col-span-2 px-2 flex items-center">
                        <StatusBadge status={template.status} />
                      </div>
                      <div className="col-span-1 px-2 flex items-center justify-between">
                        <span>{template.lastUpdated}</span>
                        <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[13px] text-[#676879] font-roboto">Rows per page</span>
              <div className="flex items-center gap-2 px-2 py-1 h-7 border border-[#C3C6D4] rounded bg-white">
                <span className="text-[13px] text-[#676879]">{rowsPerPage}</span>
                <ChevronDown className="w-5 h-5 text-[#676879]" />
              </div>
              <span className="text-[13px] text-[#676879] font-roboto">1-9 of 100</span>
              <div className="flex items-center gap-1 ml-auto">
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M14.1668 5.28984L15.0449 6.16797L11.2116 10.0013L15.0449 13.8346L14.1668 14.7128L9.45534 10.0013L14.1668 5.28984ZM6.45846 5.20963L6.45846 14.793L5.20846 14.793L5.20846 5.20963L6.45846 5.20963Z" fill="#676879"/>
                  </svg>
                </button>
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-[#676879]" />
                </button>
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-[#676879]" />
                </button>
                <button className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.8332 14.7102L4.95508 13.832L8.78841 9.9987L4.95508 6.16536L5.8332 5.28724L10.5447 9.9987L5.8332 14.7102ZM13.5415 14.7904V5.20703H14.7915V14.7904H13.5415Z" fill="#676879"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#DEDEDD] bg-white">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#505258] font-roboto">
            Copyright @ 2025 <span className="text-[#172B4D]">Arcon</span>. All right reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Templates;
