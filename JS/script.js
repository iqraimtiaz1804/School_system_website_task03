// script.js - interactions, form validation, modals, back-to-top, AOS init

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS
  if (window.AOS) AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });

  // Navbar shadow on scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  });

  // Back to top button
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) backBtn.classList.add('show'); else backBtn.classList.remove('show');
  });
  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Dynamic teacher profile modal population
  const profileModal = document.getElementById('profileModal');
  if (profileModal) {
    profileModal.addEventListener('show.bs.modal', function (event) {
      const btn = event.relatedTarget;
      const name = btn.getAttribute('data-name');
      const role = btn.getAttribute('data-role');
      const bio = btn.getAttribute('data-bio');
      const img = btn.getAttribute('data-img');

      document.getElementById('profileTitle').textContent = name;
      document.getElementById('profileName').textContent = name;
      document.getElementById('profileRole').textContent = role;
      document.getElementById('profileBio').textContent = bio;
      document.getElementById('profileImg').src = img;
      document.getElementById('profileImg').alt = name;
    });
  }

  // Form validation logic for all forms with .needs-validation
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        // Prevent actual submit (demo) and show confirmation modal
        e.preventDefault();
        const id = form.id || 'form';
        showConfirmation(id);
        form.classList.remove('was-validated'); // keep clean for next use
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Show confirmation modal (dynamically created)
  function showConfirmation(formId) {
    let message = 'Submitted successfully!';
    if (formId === 'admissionForm') {
      message = 'Your admission application has been received. We will contact you soon via email.';
    } else if (formId === 'contactForm' || formId === '') {
      message = 'Thank you! Your message has been received.';
    }

    const modalHTML = `
      <div class="modal fade" id="confirmModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-sm">
            <div class="modal-header">
              <h5 class="modal-title">Success</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-center p-4">
              <p class="mb-0">${message}</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-red" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
    document.getElementById('confirmModal').addEventListener('hidden.bs.modal', function () {
      document.getElementById('confirmModal').remove();
    });
  }

  // Hook profile modal "Apply to this class" button to open admission modal (keeps user flow)
  const profileApplyButtons = document.querySelectorAll('#profileModal [data-bs-target="#admissionModal"]');
  profileApplyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // For better UX we could copy role/teacher to the admission modal, left as improvement
      // Admission modal will open via data-bs attributes (Bootstrap handles it)
    });
  });

  // Expose showConfirmation for debugging (optional)
  window.showConfirmation = showConfirmation;
});
