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
