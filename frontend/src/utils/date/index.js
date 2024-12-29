export const formatPost = (createdAt) => {
  const current = Date.now();
  createdAt = new Date(createdAt);

  const dayDif = Math.floor((current - createdAt) / (1000 * 60 * 60 * 24));
  const hourDif = Math.floor((current - createdAt) / (1000 * 60 * 60));
  const minDif = Math.floor((current - createdAt) / (1000 * 60));

  if (dayDif > 10)
    return createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  else if (dayDif >= 1) return `${dayDif}d`;
  else if (hourDif >= 1) return `${hourDif}h`;
  else if (minDif >= 1) return `${minDif}m`;
  else return "Just now";
};

export const formatMemberSinceDate = (createdAt) => {
  const date = new Date(createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};
