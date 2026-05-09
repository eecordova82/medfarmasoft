import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Loader2, AlertCircle, ArrowLeft, Phone } from 'lucide-react';
import { TenantProvider } from '../contexts/TenantContext';
import { useBookingApi } from '../hooks/useBookingApi';
import BookingStepper from '../components/booking/BookingStepper';
import ProfessionalList from '../components/booking/ProfessionalList';
import ServiceList from '../components/booking/ServiceList';
import AvailabilityCalendar from '../components/booking/AvailabilityCalendar';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import PatientForm from '../components/booking/PatientForm';
import OtpVerification from '../components/booking/OtpVerification';
import BookingConfirmation from '../components/booking/BookingConfirmation';
import BookingSummary from '../components/booking/BookingSummary';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function BookingPage() {
  const { slug } = useParams();
  const { t } = useTranslation();

  // Estado del flujo
  const [status, setStatus] = useState('loading'); // loading, ready, error
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Datos del tenant
  const [tenant, setTenant] = useState(null);

  // Selecciones del usuario
  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [selectedProfesional, setSelectedProfesional] = useState(null);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [reservaId, setReservaId] = useState(null);
  const [patientEmail, setPatientEmail] = useState('');

  // Profesionales disponibles para el servicio seleccionado
  // Si el servicio tiene asignados → solo esos. Si no → todos.
  const [profesionalesDelServicio, setProfesionalesDelServicio] = useState([]);

  const api = useBookingApi(tenant?.tenantId);

  // 1. Resolver tenant por slug o por dominio personalizado
  useEffect(() => {
    setStatus('loading');
    const hostname = window.location.hostname;
    const isCustomDomain = hostname !== 'localhost'
      && hostname !== 'medfarmasoft.es'
      && hostname !== 'www.medfarmasoft.es';

    const resolve = isCustomDomain && !slug
      ? api.getTenantByDomain(hostname)
      : slug
        ? api.getTenant(slug)
        : null;

    if (!resolve) {
      setError(t('errors.workspaceNotFound'));
      setStatus('error');
      return;
    }

    resolve
      .then((data) => {
        setTenant(data);
        setStatus('ready');
      })
      .catch((err) => {
        setError(err.message || t('errors.workspaceNotFound'));
        setStatus('error');
      });
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Cargar profesionales cuando el tenant está resuelto
  useEffect(() => {
    if (!tenant?.tenantId) return;
    api.getProfesionales()
      .then(setProfesionales)
      .catch((err) => console.error('Error cargando profesionales:', err));
  }, [tenant?.tenantId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Cargar servicios (con sus profesionales asignados)
  useEffect(() => {
    if (!tenant?.tenantId) return;
    api.getServicios()
      .then(setServicios)
      .catch((err) => console.error('Error cargando servicios:', err));
  }, [tenant?.tenantId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 4. Cuando se selecciona un servicio, resolver qué profesionales aplican
  useEffect(() => {
    if (!selectedServicio) return;

    const asignados = selectedServicio.profesionales ?? [];

    if (asignados.length === 1) {
      // Un solo profesional asignado → preseleccionar automáticamente
      const profAsignado = profesionales.find(p => p.id === asignados[0].profesionalId);
      if (profAsignado) {
        setSelectedProfesional(profAsignado);
        setProfesionalesDelServicio([profAsignado]);
      }
    } else if (asignados.length > 1) {
      // Varios profesionales → filtrar la lista y preseleccionar el defecto si existe
      const profsFiltrados = profesionales.filter(p =>
        asignados.some(a => a.profesionalId === p.id)
      );
      setProfesionalesDelServicio(profsFiltrados);

      const defecto = asignados.find(a => a.esDefecto);
      if (defecto) {
        const profDefecto = profsFiltrados.find(p => p.id === defecto.profesionalId);
        if (profDefecto) setSelectedProfesional(profDefecto);
      }
    } else {
      // Sin asignados → todos los profesionales
      setProfesionalesDelServicio(profesionales);
      setSelectedProfesional(null);
    }
  }, [selectedServicio?.id, profesionales]); // eslint-disable-line react-hooks/exhaustive-deps

  // 5. Cargar disponibilidad cuando se selecciona fecha (paso 3)
  useEffect(() => {
    if (step !== 3 || !selectedDate || !selectedProfesional || !selectedServicio) return;

    setSlotsLoading(true);
    setSlots([]);
    setSelectedSlot(null);

    const fechaStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    api.getDisponibilidad(selectedProfesional.id, selectedServicio.id, fechaStr)
      .then((data) => setSlots(data.slots || []))
      .catch((err) => console.error('Error cargando disponibilidad:', err))
      .finally(() => setSlotsLoading(false));
  }, [step, selectedDate, selectedProfesional?.id, selectedServicio?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleSelectProfesional = (prof) => {
    setSelectedProfesional(prof);
    setStep(2);
  };

  const handleSelectServicio = (svc) => {
    setSelectedServicio(svc);

    const asignados = svc.profesionales ?? [];

    if (asignados.length === 1) {
      // Profesional único → preseleccionar y saltar a disponibilidad
      const prof = profesionales.find(p => p.id === asignados[0].profesionalId);
      if (prof) setSelectedProfesional(prof);
      setStep(3);
    } else if (asignados.length > 1) {
      const defecto = asignados.find(a => a.esDefecto);
      if (defecto) {
        const prof = profesionales.find(p => p.id === defecto.profesionalId);
        if (prof) setSelectedProfesional(prof);
      }
      setStep(3);
    } else {
      // Sin asignados → elegir profesional manualmente
      setSelectedProfesional(null);
      setStep(3);
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSelectSlot = (hora, profesionalDelSlot) => {
    setSelectedSlot(hora);
    // Si el slot tiene profesional específico (disponibilidad combinada), usarlo
    if (profesionalDelSlot) {
      const prof = profesionales.find(p => p.id === profesionalDelSlot);
      if (prof) setSelectedProfesional(prof);
    }
    setStep(4);
  };

  const handleSubmitForm = async (formData) => {
    if (!selectedDate || !selectedSlot) return;

    setFormLoading(true);
    setError('');

    try {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const fechaHoraLocal = `${year}-${month}-${day}T${selectedSlot}:00`;

      const result = await api.crearReserva({
        profesionalId: selectedProfesional.id,
        servicioId: selectedServicio.id,
        fechaHora: fechaHoraLocal,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        notas: formData.notas,
        captchaToken: formData.captchaToken,
        website: formData.website,
        elapsed: formData.elapsed,
      });

      setReservaId(result.reservaId);
      setPatientEmail(formData.email);
      setStep(5);
    } catch (err) {
      setError(err.message || t('errors.reservationFailed'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleVerifyOtp = async (code) => {
    setFormLoading(true);
    setError('');
    try {
      await api.verificarOtp({ reservaId, codigoOtp: code });
      setStep(6);
    } catch (err) {
      setError(err.message || t('errors.wrongCode'));
    } finally {
      setFormLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await api.reenviarOtp(reservaId);
  };

  const goBack = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step]);

  const resetBooking = useCallback(() => {
    setStep(1);
    setSelectedProfesional(null);
    setSelectedServicio(null);
    setSelectedDate(null);
    setSelectedSlot(null);
  }, []);

  // Determina si el selector de profesional debe ocultarse
  // (servicio con un único profesional asignado)
  const profesionalAutoseleccionado = selectedServicio?.profesionales?.length === 1;

  // --- Render ---

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">{t('errors.couldNotLoad')}</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  const fecha = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    : null;

  return (
    <TenantProvider tenant={tenant}>
      <div className="min-h-screen bg-gray-50">
        {/* Header con branding del tenant */}
        <header
          className="py-4 px-6 shadow-lg"
          style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button onClick={resetBooking} className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition-opacity">
              {tenant?.logoUrl && (
                <img
                  src={tenant.logoUrl}
                  alt={tenant.nombre}
                  className="h-12 rounded-lg object-contain bg-white p-1"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              <div className="text-left">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">{tenant?.nombre}</h1>
                <p className="text-xs text-gray-800/70">{t('booking.header.subtitle')}</p>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="text-gray-900" />
              {tenant?.telefono && (
                <a href={`tel:${tenant.telefono}`} className="hidden sm:flex items-center gap-2 bg-white rounded-full px-5 py-2.5 text-sm font-semibold text-gray-800 hover:shadow-lg transition-all">
                  <Phone className="w-4 h-4" style={{ color: 'var(--color-tenant-primary, #11756A)' }} />
                  {tenant.telefono.trim()}
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Stepper */}
        {step <= 5 && <BookingStepper currentStep={step} />}

        {/* Contenido */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Botón volver */}
          {step > 1 && step <= 5 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> {t('common.back')}
            </button>
          )}

          {error && step < 6 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Area principal */}
            <div className="lg:col-span-2">
              {/* Paso 1: Elegir servicio (nuevo flujo principal) */}
              {step === 1 && (
                <ServiceList
                  servicios={servicios}
                  onSelect={handleSelectServicio}
                />
              )}

              {/* Paso 2: Elegir profesional (solo si el servicio tiene varios o ninguno asignado) */}
              {step === 2 && !profesionalAutoseleccionado && (
                <div>
                  {/* Indicador de profesional autoasignado */}
                  {selectedProfesional && selectedServicio?.profesionales?.length > 0 && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                      <span>✓</span>
                      <span>
                        <Trans i18nKey="booking.infoBoxes.appointmentWithDefault" values={{ name: `${selectedProfesional.nombre} ${selectedProfesional.apellidos}` }}>
                          Tu cita será con <strong>nombre</strong> (por defecto para este servicio)
                        </Trans>
                      </span>
                    </div>
                  )}
                  <ProfessionalList
                    profesionales={profesionalesDelServicio.length > 0 ? profesionalesDelServicio : profesionales}
                    onSelect={handleSelectProfesional}
                    selectedId={selectedProfesional?.id}
                  />
                </div>
              )}

              {/* Paso 3: Fecha y hora */}
              {step === 3 && (
                <div>
                  {/* Profesional autoseleccionado: informar al usuario */}
                  {profesionalAutoseleccionado && selectedProfesional && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-center gap-2">
                      <span>👤</span>
                      <span>
                        <Trans i18nKey="booking.infoBoxes.appointmentWith" values={{ name: `${selectedProfesional.nombre} ${selectedProfesional.apellidos}` }}>
                          Tu cita será con <strong>nombre</strong>
                        </Trans>
                      </span>
                    </div>
                  )}
                  <AvailabilityCalendar
                    selectedDate={selectedDate}
                    onDateSelect={handleSelectDate}
                  />
                  {selectedDate && (
                    <TimeSlotPicker
                      slots={slots}
                      selectedSlot={selectedSlot}
                      onSlotSelect={handleSelectSlot}
                      loading={slotsLoading}
                    />
                  )}
                </div>
              )}

              {step === 4 && (
                <PatientForm
                  onSubmit={handleSubmitForm}
                  loading={formLoading}
                />
              )}
              {step === 5 && (
                <OtpVerification
                  email={patientEmail}
                  onVerify={handleVerifyOtp}
                  onResend={handleResendOtp}
                  loading={formLoading}
                />
              )}
              {step === 6 && (
                <BookingConfirmation
                  booking={{
                    profesional: selectedProfesional,
                    servicio: selectedServicio,
                    fecha,
                    hora: selectedSlot,
                  }}
                  tenant={tenant}
                  onReset={resetBooking}
                />
              )}
            </div>

            {/* Sidebar resumen */}
            {step >= 2 && step <= 5 && (
              <div className="hidden lg:block">
                <BookingSummary
                  profesional={selectedProfesional}
                  servicio={selectedServicio}
                  fecha={fecha}
                  hora={selectedSlot}
                />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer
          className="text-center py-5 text-sm mt-auto"
          style={{ backgroundColor: 'var(--color-tenant-primary, #11756A)' }}
        >
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-6">
            {tenant?.telefono && (
              <a href={`tel:${tenant.telefono}`} className="flex items-center gap-2 text-gray-900 font-medium hover:underline">
                <Phone className="w-4 h-4" />
                {tenant.telefono.trim()}
              </a>
            )}
            {tenant?.urlWeb && (
              <a href={tenant.urlWeb} className="text-gray-800/70 hover:text-gray-900 transition-colors">
                {tenant.nombre}
              </a>
            )}
          </div>
          {tenant?.plan !== 'professional' && tenant?.plan !== 'enterprise' && (
            <p className="text-xs mt-2 text-gray-800/50">{t('booking.header.poweredBy')}</p>
          )}
        </footer>
      </div>
    </TenantProvider>
  );
}
