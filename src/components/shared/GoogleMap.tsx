export default function GoogleMap() {
  return (
    <div className="overflow-hidden rounded-xl border shadow-sm">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2736!2d77.4261!3d28.4744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI4JzI3LjgiTiA3N8KwMjUnMzMuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Dhyeya IAS Greater Noida Location"
      />
    </div>
  );
}
