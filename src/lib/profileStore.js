const PROFILE_KEY = "chatapp_profile_v1";

export function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw
      ? JSON.parse(raw)
      : { name: "", phone: "", bio: "", avatar: null };
  } catch {
    return { name: "", phone: "", bio: "", avatar: null };
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    console.log();
  }
}

export function clearProfile() {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    console.log();
  }
}
