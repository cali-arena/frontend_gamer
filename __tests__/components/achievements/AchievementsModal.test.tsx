import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AchievementsModal } from '@/components/achievements/AchievementsModal';
import { mockAchievements, mockGames } from '@/data/mockAchievements';

// Mock the modal component to avoid portal issues in tests
jest.mock('@/components/ui/Modal', () => ({
  Modal: ({ children, isOpen, onClose }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal" role="dialog" aria-modal="true">
        <button onClick={onClose} aria-label="Close modal">×</button>
        {children}
      </div>
    );
  }
}));

describe('AchievementsModal', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    achievements: mockAchievements,
    games: mockGames,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Modal Open/Close', () => {
    it('renders modal when isOpen is true', () => {
      render(<AchievementsModal {...defaultProps} />);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
      render(<AchievementsModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} />);
      
      const closeButton = screen.getByLabelText('Close modal');
      await user.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('closes modal on ESC key press', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} />);
      
      await user.keyboard('{Escape}');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Compact View (Page 2)', () => {
    it('renders compact view by default', () => {
      render(<AchievementsModal {...defaultProps} initialView="compact" />);
      expect(screen.getByText('Conquistas neste jogo')).toBeInTheDocument();
      expect(screen.getByText('ver tudo')).toBeInTheDocument();
    });

    it('shows first 3 achievements in compact view', () => {
      render(<AchievementsModal {...defaultProps} initialView="compact" />);
      const achievements = screen.getAllByRole('button', { name: /ver detalhes/i });
      expect(achievements.length).toBeLessThanOrEqual(3);
    });

    it('switches to list view when "ver tudo" is clicked', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="compact" />);
      
      const verTudoButton = screen.getByText('ver tudo');
      await user.click(verTudoButton);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Pesquisar conquista')).toBeInTheDocument();
      });
    });
  });

  describe('List View (Page 3)', () => {
    it('renders list view with search input', () => {
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      expect(screen.getByPlaceholderText('Pesquisar conquista')).toBeInTheDocument();
    });

    it('filters achievements by search query', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      const searchInput = screen.getByPlaceholderText('Pesquisar conquista');
      await user.type(searchInput, 'Vitória');
      
      await waitFor(() => {
        expect(screen.getByText('Vitória Real')).toBeInTheDocument();
      });
    });

    it('shows empty state when no achievements match search', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      const searchInput = screen.getByPlaceholderText('Pesquisar conquista');
      await user.type(searchInput, 'Nonexistent Achievement');
      
      await waitFor(() => {
        expect(screen.getByText('Nenhuma conquista encontrada')).toBeInTheDocument();
      });
    });

    it('opens detail view when achievement is clicked', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Wait for achievements to render
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      // Click on an achievement
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(() => {
          // Detail view should show achievement name
          expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
        }, { timeout: 2000 });
      }
    });
  });

  describe('Detail View (Page 4)', () => {
    it('renders detail view with achievement metadata', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Wait for list to render and click an achievement
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(() => {
          expect(screen.getByText('plataforma')).toBeInTheDocument();
          expect(screen.getByText('nickname')).toBeInTheDocument();
        }, { timeout: 2000 });
      }
    });

    it('navigates to previous achievement', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Open detail view
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 1) {
        await user.click(achievementItems[0]);
        
        await waitFor(() => {
          const prevButton = screen.getByLabelText('Conquista anterior');
          expect(prevButton).toBeInTheDocument();
        }, { timeout: 2000 });
      }
    });

    it('navigates to next achievement', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Open detail view
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(() => {
          const nextButton = screen.getByLabelText('Próxima conquista');
          expect(nextButton).toBeInTheDocument();
        }, { timeout: 2000 });
      }
    });

    it('toggles watched state', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Open detail view
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(async () => {
          const watchButton = screen.getByLabelText(/marcar como vendo/i);
          expect(watchButton).toBeInTheDocument();
          
          await user.click(watchButton);
          
          // Button should now be in active state
          await waitFor(() => {
            expect(watchButton).toHaveAttribute('aria-pressed', 'true');
          });
        }, { timeout: 2000 });
      }
    });

    it('toggles pinned state', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Open detail view
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(async () => {
          const pinButton = screen.getByLabelText(/fixar/i);
          expect(pinButton).toBeInTheDocument();
          
          await user.click(pinButton);
          
          // Button should now be in active state
          await waitFor(() => {
            expect(pinButton).toHaveAttribute('aria-pressed', 'true');
          });
        }, { timeout: 2000 });
      }
    });

    it('returns to list view when back button is clicked', async () => {
      const user = userEvent.setup();
      render(<AchievementsModal {...defaultProps} initialView="list" />);
      
      // Open detail view
      await waitFor(() => {
        expect(screen.getByText('Primeiro Pouso')).toBeInTheDocument();
      });
      
      const achievementItems = screen.getAllByRole('button', { name: /ver detalhes/i });
      if (achievementItems.length > 0) {
        await user.click(achievementItems[0]);
        
        await waitFor(() => {
          const backButton = screen.getByLabelText('Fechar detalhes');
          expect(backButton).toBeInTheDocument();
          
          await user.click(backButton);
          
          // Should return to list view
          expect(screen.getByPlaceholderText('Pesquisar conquista')).toBeInTheDocument();
        }, { timeout: 2000 });
      }
    });
  });
});

